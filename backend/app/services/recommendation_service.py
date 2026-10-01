from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.vision import analyze_image_and_recommend
from app.ai.recommender import persist_recommendation
from app.exceptions.errors import NotFoundError
from app.models.history import History
from app.models.recommendation import ImageAnalysis
from app.models.upload import Upload


async def generate_recommendations_for_upload(db: AsyncSession, user_id: str, upload_id: str) -> ImageAnalysis:
    result = await db.execute(select(Upload).where(Upload.id == upload_id, Upload.user_id == user_id))
    upload = result.scalar_one_or_none()
    if upload is None:
        raise NotFoundError("Upload not found")

    ai_payload = await analyze_image_and_recommend(upload.file_path)
    analysis = await persist_recommendation(db, upload.id, ai_payload)

    db.add(History(user_id=user_id, upload_id=upload.id, analysis_id=analysis.id, action="recommendation_generated"))
    await db.commit()

    return analysis


async def get_analysis_by_id(db: AsyncSession, analysis_id: str) -> ImageAnalysis:
    result = await db.execute(select(ImageAnalysis).where(ImageAnalysis.id == analysis_id))
    analysis = result.scalar_one_or_none()
    if analysis is None:
        raise NotFoundError("Analysis not found")
    return analysis

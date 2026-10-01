from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_admin
from app.database import get_db
from app.models.recommendation import Recommendation
from app.models.song import Song
from app.models.upload import Upload
from app.models.user import User

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/overview")
async def analytics_overview(_: User = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    total_users = (await db.execute(select(func.count()).select_from(User))).scalar_one()
    total_uploads = (await db.execute(select(func.count()).select_from(Upload))).scalar_one()
    total_songs = (await db.execute(select(func.count()).select_from(Song))).scalar_one()
    total_recommendations = (await db.execute(select(func.count()).select_from(Recommendation))).scalar_one()

    top_languages = await db.execute(
        select(Recommendation.language, func.count().label("count"))
        .group_by(Recommendation.language)
        .order_by(func.count().desc())
        .limit(10)
    )

    return {
        "total_users": total_users,
        "total_uploads": total_uploads,
        "total_songs": total_songs,
        "total_recommendations": total_recommendations,
        "top_languages": [{"language": row[0], "count": row[1]} for row in top_languages.all()],
    }

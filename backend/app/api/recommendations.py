from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.exceptions.errors import AIProviderError, AIResponseParseError, NotFoundError
from app.models.user import User
from app.schemas.recommendation import RecommendationResponse, ImageAnalysisOut, RecommendationOut
from app.services.recommendation_service import generate_recommendations_for_upload, get_analysis_by_id

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])


def _to_response(analysis) -> RecommendationResponse:
    return RecommendationResponse(
        analysis_id=analysis.id,
        upload_id=analysis.upload_id,
        image_analysis=ImageAnalysisOut(
            mood=analysis.mood,
            emotion=analysis.emotion,
            scene=analysis.scene,
            location_type=analysis.location_type,
            colors=analysis.colors or [],
            lighting=analysis.lighting,
            weather=analysis.weather,
            time_of_day=analysis.time_of_day,
            season=analysis.season,
            energy=analysis.energy,
            aesthetic=analysis.aesthetic,
            objects=analysis.objects or [],
            keywords=analysis.keywords or [],
            nature_score=analysis.nature_score,
            urban_score=analysis.urban_score,
            romantic_score=analysis.romantic_score,
            adventure_score=analysis.adventure_score,
            party_score=analysis.party_score,
            calm_score=analysis.calm_score,
        ),
        recommendations=[
            RecommendationOut(
                rank=r.rank,
                title=r.title,
                artist=r.artist,
                album=r.album,
                language=r.language,
                genre=r.genre,
                music_type=r.music_type,
                movie=r.movie,
                composer=r.composer,
                mood=r.mood,
                energy=r.energy,
                tempo=r.tempo,
                reason=r.reason,
                confidence=r.confidence,
                spotify_url=r.spotify_url,
                youtube_url=r.youtube_url,
                album_cover=r.album_cover,
                preview_url=r.preview_url,
            )
            for r in sorted(analysis.recommendations, key=lambda x: x.rank)
        ],
        created_at=analysis.created_at,
    )


@router.post("/{upload_id}", response_model=RecommendationResponse, status_code=201)
async def generate_recommendations(
    upload_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        analysis = await generate_recommendations_for_upload(db, user.id, upload_id)
    except NotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except AIProviderError as exc:
        raise HTTPException(status_code=502, detail=f"AI provider error: {exc}") from exc
    except AIResponseParseError as exc:
        raise HTTPException(status_code=502, detail=f"AI response error: {exc}") from exc

    return _to_response(analysis)


@router.get("/{analysis_id}", response_model=RecommendationResponse)
async def get_recommendations(analysis_id: str, db: AsyncSession = Depends(get_db)):
    try:
        analysis = await get_analysis_by_id(db, analysis_id)
    except NotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return _to_response(analysis)

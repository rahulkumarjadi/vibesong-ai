from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.song import SongOut
from app.services.song_service import search_songs

router = APIRouter(prefix="/api/songs", tags=["songs"])


@router.get("", response_model=list[SongOut])
async def list_songs(
    q: str | None = Query(None, description="Search by title, artist, or movie"),
    language: str | None = None,
    genre: str | None = None,
    music_type: str | None = None,
    limit: int = Query(50, le=200),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    return await search_songs(db, query=q, language=language, genre=genre, music_type=music_type, limit=limit, offset=offset)

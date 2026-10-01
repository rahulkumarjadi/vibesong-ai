from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models.favorite import Favorite
from app.models.song import Song
from app.models.user import User
from app.schemas.song import SongOut

router = APIRouter(prefix="/api/favorites", tags=["favorites"])


@router.post("/{song_id}", status_code=201)
async def add_favorite(song_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    song_result = await db.execute(select(Song).where(Song.id == song_id))
    if song_result.scalar_one_or_none() is None:
        raise HTTPException(status_code=404, detail="Song not found")

    existing = await db.execute(select(Favorite).where(Favorite.user_id == user.id, Favorite.song_id == song_id))
    if existing.scalar_one_or_none() is not None:
        return {"status": "already_favorited"}

    db.add(Favorite(user_id=user.id, song_id=song_id))
    await db.commit()
    return {"status": "added"}


@router.get("", response_model=list[SongOut])
async def list_favorites(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Song).join(Favorite, Favorite.song_id == Song.id).where(Favorite.user_id == user.id)
    )
    return list(result.scalars().all())


@router.delete("/{song_id}", status_code=204)
async def remove_favorite(song_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Favorite).where(Favorite.user_id == user.id, Favorite.song_id == song_id))
    favorite = result.scalar_one_or_none()
    if favorite is None:
        raise HTTPException(status_code=404, detail="Favorite not found")
    await db.delete(favorite)
    await db.commit()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_admin
from app.database import get_db
from app.models.song import Song
from app.models.user import User
from app.schemas.song import SongCreate, SongOut

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/songs", response_model=SongOut, status_code=201)
async def create_song(payload: SongCreate, _: User = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    song = Song(**payload.model_dump())
    db.add(song)
    await db.commit()
    await db.refresh(song)
    return song


@router.delete("/songs/{song_id}", status_code=204)
async def delete_song(song_id: str, _: User = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Song).where(Song.id == song_id))
    song = result.scalar_one_or_none()
    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    await db.delete(song)
    await db.commit()


@router.get("/users", response_model=list[str])
async def list_user_emails(_: User = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User.email))
    return [row[0] for row in result.all()]

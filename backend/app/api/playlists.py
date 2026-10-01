from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models.playlist import Playlist, PlaylistSong
from app.models.song import Song
from app.models.user import User
from app.schemas.playlist import PlaylistCreate, PlaylistOut, PlaylistDetailOut, PlaylistAddSong

router = APIRouter(prefix="/api/playlists", tags=["playlists"])


@router.post("", response_model=PlaylistOut, status_code=201)
async def create_playlist(payload: PlaylistCreate, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    playlist = Playlist(user_id=user.id, name=payload.name, description=payload.description, is_public=payload.is_public)
    db.add(playlist)
    await db.commit()
    await db.refresh(playlist)
    return playlist


@router.get("", response_model=list[PlaylistOut])
async def list_playlists(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Playlist).where(Playlist.user_id == user.id))
    return list(result.scalars().all())


@router.get("/{playlist_id}", response_model=PlaylistDetailOut)
async def get_playlist(playlist_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Playlist).where(Playlist.id == playlist_id, Playlist.user_id == user.id))
    playlist = result.scalar_one_or_none()
    if playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found")

    song_ids = [ps.song_id for ps in sorted(playlist.songs, key=lambda x: x.position)]
    songs: list[Song] = []
    if song_ids:
        song_result = await db.execute(select(Song).where(Song.id.in_(song_ids)))
        by_id = {s.id: s for s in song_result.scalars().all()}
        songs = [by_id[sid] for sid in song_ids if sid in by_id]

    return PlaylistDetailOut(
        id=playlist.id, name=playlist.name, description=playlist.description,
        is_public=playlist.is_public, created_at=playlist.created_at, songs=songs,
    )


@router.post("/{playlist_id}/songs", status_code=201)
async def add_song_to_playlist(
    playlist_id: str, payload: PlaylistAddSong, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Playlist).where(Playlist.id == playlist_id, Playlist.user_id == user.id))
    playlist = result.scalar_one_or_none()
    if playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found")

    song_result = await db.execute(select(Song).where(Song.id == payload.song_id))
    if song_result.scalar_one_or_none() is None:
        raise HTTPException(status_code=404, detail="Song not found")

    position = len(playlist.songs)
    db.add(PlaylistSong(playlist_id=playlist.id, song_id=payload.song_id, position=position))
    await db.commit()
    return {"status": "added"}


@router.delete("/{playlist_id}", status_code=204)
async def delete_playlist(playlist_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Playlist).where(Playlist.id == playlist_id, Playlist.user_id == user.id))
    playlist = result.scalar_one_or_none()
    if playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found")
    await db.delete(playlist)
    await db.commit()

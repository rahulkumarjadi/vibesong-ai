from datetime import datetime
from pydantic import BaseModel, ConfigDict

from app.schemas.song import SongOut


class PlaylistCreate(BaseModel):
    name: str
    description: str | None = None
    is_public: bool = False


class PlaylistOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    description: str | None = None
    is_public: bool
    created_at: datetime


class PlaylistDetailOut(PlaylistOut):
    songs: list[SongOut] = []


class PlaylistAddSong(BaseModel):
    song_id: str

from pydantic import BaseModel, ConfigDict


class SongOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    artist: str
    album: str | None = None
    language: str
    genre: str | None = None
    music_type: str | None = None
    movie: str | None = None
    composer: str | None = None
    mood: str | None = None
    energy: str | None = None
    tempo: str | None = None
    spotify_url: str | None = None
    youtube_url: str | None = None
    album_cover: str | None = None
    preview_url: str | None = None


class SongCreate(BaseModel):
    title: str
    artist: str
    album: str | None = None
    language: str
    genre: str | None = None
    music_type: str | None = None
    movie: str | None = None
    composer: str | None = None
    mood: str | None = None
    energy: str | None = None
    tempo: str | None = None
    spotify_url: str | None = None
    youtube_url: str | None = None
    album_cover: str | None = None
    preview_url: str | None = None

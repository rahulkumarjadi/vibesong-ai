import uuid
from datetime import datetime

from sqlalchemy import String, Integer, Float, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Song(Base):
    """Master song catalog (seeded from database/*.csv or an external music API)."""
    __tablename__ = "songs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    artist: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    album: Mapped[str | None] = mapped_column(String(255), nullable=True)
    language: Mapped[str] = mapped_column(String(32), index=True, nullable=False)  # Telugu, Hindi, English...
    genre: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)
    music_type: Mapped[str | None] = mapped_column(String(64), nullable=True)  # Song, BGM, Instrumental...
    movie: Mapped[str | None] = mapped_column(String(255), nullable=True)
    composer: Mapped[str | None] = mapped_column(String(255), nullable=True)
    mood: Mapped[str | None] = mapped_column(String(64), nullable=True)
    energy: Mapped[str | None] = mapped_column(String(16), nullable=True)  # Low, Medium, High
    tempo: Mapped[str | None] = mapped_column(String(32), nullable=True)
    duration_sec: Mapped[int | None] = mapped_column(Integer, nullable=True)
    release_year: Mapped[int | None] = mapped_column(Integer, nullable=True)

    spotify_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    youtube_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    album_cover: Mapped[str | None] = mapped_column(String(500), nullable=True)
    preview_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    popularity: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

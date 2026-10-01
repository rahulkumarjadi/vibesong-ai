import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey, Integer, JSON, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ImageAnalysis(Base):
    """Structured result of STEP 1 + STEP 2 of the AI vision pipeline."""
    __tablename__ = "image_analyses"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    upload_id: Mapped[str] = mapped_column(String(36), ForeignKey("uploads.id"), nullable=False, unique=True)

    mood: Mapped[str | None] = mapped_column(String(64))
    emotion: Mapped[str | None] = mapped_column(String(64))
    scene: Mapped[str | None] = mapped_column(String(120))
    location_type: Mapped[str | None] = mapped_column(String(120))
    lighting: Mapped[str | None] = mapped_column(String(64))
    weather: Mapped[str | None] = mapped_column(String(64))
    time_of_day: Mapped[str | None] = mapped_column(String(64))
    season: Mapped[str | None] = mapped_column(String(32))
    energy: Mapped[str | None] = mapped_column(String(16))
    aesthetic: Mapped[str | None] = mapped_column(String(120))
    festival: Mapped[str | None] = mapped_column(String(120), nullable=True)

    colors: Mapped[list] = mapped_column(JSON, default=list)
    objects: Mapped[list] = mapped_column(JSON, default=list)
    keywords: Mapped[list] = mapped_column(JSON, default=list)

    nature_score: Mapped[int] = mapped_column(Integer, default=0)
    urban_score: Mapped[int] = mapped_column(Integer, default=0)
    romantic_score: Mapped[int] = mapped_column(Integer, default=0)
    adventure_score: Mapped[int] = mapped_column(Integer, default=0)
    party_score: Mapped[int] = mapped_column(Integer, default=0)
    calm_score: Mapped[int] = mapped_column(Integer, default=0)

    raw_json: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    upload: Mapped["Upload"] = relationship(back_populates="analysis")
    recommendations: Mapped[list["Recommendation"]] = relationship(back_populates="analysis", cascade="all, delete-orphan")


class Recommendation(Base):
    """A single ranked song recommendation produced for an ImageAnalysis."""
    __tablename__ = "recommendations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    analysis_id: Mapped[str] = mapped_column(String(36), ForeignKey("image_analyses.id"), nullable=False, index=True)
    song_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("songs.id"), nullable=True)

    rank: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    artist: Mapped[str] = mapped_column(String(255), nullable=False)
    album: Mapped[str | None] = mapped_column(String(255))
    language: Mapped[str | None] = mapped_column(String(32))
    genre: Mapped[str | None] = mapped_column(String(64))
    music_type: Mapped[str | None] = mapped_column(String(64))
    movie: Mapped[str | None] = mapped_column(String(255))
    composer: Mapped[str | None] = mapped_column(String(255))
    mood: Mapped[str | None] = mapped_column(String(64))
    energy: Mapped[str | None] = mapped_column(String(16))
    tempo: Mapped[str | None] = mapped_column(String(32))
    reason: Mapped[str | None] = mapped_column(String(500))
    confidence: Mapped[float] = mapped_column(Float, default=0.0)

    spotify_url: Mapped[str | None] = mapped_column(String(500))
    youtube_url: Mapped[str | None] = mapped_column(String(500))
    album_cover: Mapped[str | None] = mapped_column(String(500))
    preview_url: Mapped[str | None] = mapped_column(String(500))

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    analysis: Mapped["ImageAnalysis"] = relationship(back_populates="recommendations")

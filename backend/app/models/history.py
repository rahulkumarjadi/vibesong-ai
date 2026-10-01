import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class History(Base):
    """Tracks every upload -> recommendation event for a user's activity feed."""
    __tablename__ = "history"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    upload_id: Mapped[str] = mapped_column(String(36), ForeignKey("uploads.id"), nullable=False)
    analysis_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("image_analyses.id"), nullable=True)
    action: Mapped[str] = mapped_column(String(32), default="recommendation_generated")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="history")

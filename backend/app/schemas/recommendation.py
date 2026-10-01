from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ImageAnalysisScores(BaseModel):
    nature: int = 0
    urban: int = 0
    romantic: int = 0
    adventure: int = 0
    party: int = 0
    calm: int = 0


class ImageAnalysisOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    mood: str | None = None
    emotion: str | None = None
    scene: str | None = None
    location_type: str | None = None
    colors: list[str] = []
    lighting: str | None = None
    weather: str | None = None
    time_of_day: str | None = None
    season: str | None = None
    energy: str | None = None
    aesthetic: str | None = None
    objects: list[str] = []
    keywords: list[str] = []
    nature_score: int = 0
    urban_score: int = 0
    romantic_score: int = 0
    adventure_score: int = 0
    party_score: int = 0
    calm_score: int = 0


class RecommendationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    rank: int
    title: str
    artist: str
    album: str | None = None
    language: str | None = None
    genre: str | None = None
    music_type: str | None = None
    movie: str | None = None
    composer: str | None = None
    mood: str | None = None
    energy: str | None = None
    tempo: str | None = None
    reason: str | None = None
    confidence: float
    spotify_url: str | None = None
    youtube_url: str | None = None
    album_cover: str | None = None
    preview_url: str | None = None


class RecommendationResponse(BaseModel):
    analysis_id: str
    upload_id: str
    image_analysis: ImageAnalysisOut
    recommendations: list[RecommendationOut]
    created_at: datetime

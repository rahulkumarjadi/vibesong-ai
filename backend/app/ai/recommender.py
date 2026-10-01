"""
Turns the raw AI JSON payload into persisted ImageAnalysis + Recommendation rows,
and (best-effort) links each recommendation to a catalog Song row when a close match exists.
"""
from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.recommendation import ImageAnalysis, Recommendation
from app.models.song import Song


def _clamp(value, lo=0, hi=100) -> int:
    try:
        return max(lo, min(hi, int(value)))
    except (TypeError, ValueError):
        return 0


async def _find_matching_song(db: AsyncSession, title: str, artist: str) -> Song | None:
    stmt = select(Song).where(
        and_(
            func.lower(Song.title) == title.strip().lower(),
            func.lower(Song.artist) == artist.strip().lower(),
        )
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def persist_recommendation(db: AsyncSession, upload_id: str, ai_payload: dict) -> ImageAnalysis:
    analysis_data = ai_payload.get("image_analysis", {}) or {}
    scores = analysis_data.get("scores", {}) or {}
    raw_recs = ai_payload.get("recommendations", []) or []

    analysis = ImageAnalysis(
        upload_id=upload_id,
        mood=analysis_data.get("mood"),
        emotion=analysis_data.get("emotion"),
        scene=analysis_data.get("scene"),
        location_type=analysis_data.get("location_type"),
        lighting=analysis_data.get("lighting"),
        weather=analysis_data.get("weather"),
        time_of_day=analysis_data.get("time_of_day"),
        season=analysis_data.get("season"),
        energy=analysis_data.get("energy"),
        aesthetic=analysis_data.get("aesthetic"),
        festival=analysis_data.get("festival"),
        colors=analysis_data.get("colors", []),
        objects=analysis_data.get("objects", []),
        keywords=analysis_data.get("keywords", []),
        nature_score=_clamp(scores.get("nature")),
        urban_score=_clamp(scores.get("urban")),
        romantic_score=_clamp(scores.get("romantic")),
        adventure_score=_clamp(scores.get("adventure")),
        party_score=_clamp(scores.get("party")),
        calm_score=_clamp(scores.get("calm")),
        raw_json=ai_payload,
    )
    db.add(analysis)
    await db.flush()  # get analysis.id

    seen = set()
    rank = 0
    for item in raw_recs:
        key = (str(item.get("title", "")).strip().lower(), str(item.get("artist", "")).strip().lower())
        if not key[0] or key in seen:
            continue
        seen.add(key)
        rank += 1

        matched_song = await _find_matching_song(db, item.get("title", ""), item.get("artist", ""))

        db.add(
            Recommendation(
                analysis_id=analysis.id,
                song_id=matched_song.id if matched_song else None,
                rank=rank,
                title=item.get("title", "Unknown"),
                artist=item.get("artist", "Unknown"),
                album=item.get("album"),
                language=item.get("language"),
                genre=item.get("genre"),
                music_type=item.get("music_type"),
                movie=item.get("movie"),
                composer=item.get("composer"),
                mood=item.get("mood"),
                energy=item.get("energy"),
                tempo=item.get("tempo"),
                reason=item.get("reason"),
                confidence=float(item.get("confidence", 0)),
                spotify_url=(matched_song.spotify_url if matched_song else item.get("spotify_url")),
                youtube_url=(matched_song.youtube_url if matched_song else item.get("youtube_url")),
                album_cover=(matched_song.album_cover if matched_song else item.get("album_cover")),
                preview_url=(matched_song.preview_url if matched_song else item.get("preview_url")),
            )
        )

    await db.commit()
    await db.refresh(analysis)
    return analysis

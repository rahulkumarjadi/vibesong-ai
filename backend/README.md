# VibeSong AI — Backend

**"Your Photo. Your Soundtrack."**

Production-ready FastAPI backend that analyzes an uploaded photo with Claude's vision
model and returns 20 ranked song recommendations spanning Telugu, Hindi, English,
BGMs, instrumentals, lo-fi, classical, devotional and mood/activity playlists.

## Stack

- **FastAPI** + **SQLAlchemy 2.0 (async)** — SQLite by default, swap to Postgres via `DATABASE_URL`
- **Anthropic API** (`anthropic` SDK) — image analysis + song recommendation via Claude vision
- **JWT auth** (access + refresh tokens) with **bcrypt** password hashing
- **Alembic** migrations for production schema management
- **slowapi** rate limiting, structured logging, global error-handling middleware

## Setup

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY + SECRET_KEY
```

## Run (dev)

```bash
uvicorn main:app --reload
```

The app auto-creates tables on startup in dev. Visit `http://localhost:8000/docs` for
interactive Swagger UI.

## Seed the song catalog

```bash
python -m app.tasks.seed_songs
```

Loads `database/telugu_songs.csv`, `hindi_songs.csv`, `english_songs.csv`, and
`bgm_songs.csv` into the `songs` table. Recommendations from the AI are matched
against this catalog by title+artist when possible (to attach real Spotify/YouTube
links you've curated); unmatched songs are still returned using the AI's own metadata.

## Core flow

1. `POST /api/auth/register`, `POST /api/auth/login` → get JWT access/refresh tokens
2. `POST /api/upload` (multipart file) → stores the photo, returns `upload_id`
3. `POST /api/recommendations/{upload_id}` → sends the image to Claude, parses the
   `image_analysis` + 20 `recommendations`, persists both, returns them
4. `GET /api/recommendations/{analysis_id}` → refetch a past result
5. `GET /api/songs?q=&language=&genre=` → browse/search the catalog
6. `POST /api/playlists`, `POST /api/playlists/{id}/songs` → build playlists
7. `POST /api/favorites/{song_id}` → like a song
8. `GET /api/history` → a user's past uploads/recommendations
9. `GET /api/analytics/overview` (admin only) → usage stats

## Run with Docker

```bash
docker build -t vibesong-backend .
docker run -p 8000:8000 --env-file .env vibesong-backend
```

## Run tests

```bash
pytest
```

## Production notes

- Switch `DATABASE_URL` to Postgres and run `alembic upgrade head` instead of relying
  on `init_models()` (which is dev-only auto-create).
- Store uploads in S3 (boto3 is already in requirements.txt) instead of local disk for
  multi-instance deployments — swap the implementation in `app/services/upload_service.py`.
- Set a strong random `SECRET_KEY` and put the app behind HTTPS.
- Tune `slowapi` rate limits in `app/utils/rate_limit.py` per endpoint as needed.

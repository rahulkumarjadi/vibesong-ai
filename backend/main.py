"""
VibeSong AI — backend entrypoint.
"Your Photo. Your Soundtrack."
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

from app.config import settings
from app.database import init_models
from app.logging import configure_logging
from app.middleware.error_handler import ErrorHandlerMiddleware
from app.middleware.request_logger import RequestLoggerMiddleware
from app.utils.rate_limit import limiter
from app.api.routes import youtube

from app.api import auth, users, upload, recommendations, songs, playlists, favorites, history, analytics, admin

configure_logging()
logger = logging.getLogger("vibesong")

@asynccontextmanager
async def lifespan(_: FastAPI):
    logger.info("Starting %s (env=%s)", settings.APP_NAME, settings.ENV)
    await init_models()  # dev convenience; use Alembic migrations for production
    yield


app = FastAPI(
    title=settings.APP_NAME,
    description="Your Photo. Your Soundtrack. — AI-powered image-to-song recommendation engine.",
    version="1.0.0",
    lifespan=lifespan,
)


app.include_router(youtube.router)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(ErrorHandlerMiddleware)
app.add_middleware(RequestLoggerMiddleware)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(upload.router)
app.include_router(recommendations.router)
app.include_router(songs.router)
app.include_router(playlists.router)
app.include_router(favorites.router)
app.include_router(history.router)
app.include_router(analytics.router)
app.include_router(admin.router)


@app.get("/", tags=["health"])
async def root():
    return {"app": settings.APP_NAME, "tagline": "Your Photo. Your Soundtrack.", "status": "ok"}


@app.get("/health", tags=["health"])
async def health():
    return {"status": "healthy"}

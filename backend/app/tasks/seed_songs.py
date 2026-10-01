"""
One-off script to load database/*.csv catalog files into the `songs` table.

Usage:
    python -m app.tasks.seed_songs
"""
import asyncio
import csv
from pathlib import Path

from app.database import AsyncSessionLocal, init_models
from app.models.song import Song

CSV_FILES = [
    "telugu_songs.csv",
    "hindi_songs.csv",
    "english_songs.csv",
    "bgm_songs.csv",
]

DATABASE_DIR = Path(__file__).resolve().parents[2] / "database"


async def seed() -> None:
    await init_models()
    async with AsyncSessionLocal() as db:
        inserted = 0
        for filename in CSV_FILES:
            csv_path = DATABASE_DIR / filename
            if not csv_path.exists():
                print(f"skip (not found): {csv_path}")
                continue
            with open(csv_path, newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    row = {k: (v if v not in ("", None) else None) for k, v in row.items()}
                    db.add(Song(**row))
                    inserted += 1
        await db.commit()
        print(f"Seeded {inserted} songs.")


if __name__ == "__main__":
    asyncio.run(seed())

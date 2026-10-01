from googleapiclient.discovery import build
from app.config import settings

youtube = build(
    "youtube",
    "v3",
    developerKey=settings.YOUTUBE_API_KEY,
)

async def search_youtube(title: str, artist: str):
    query = f"{title} {artist} official"

    request = youtube.search().list(
        part="snippet",
        q=query,
        type="video",
        maxResults=1,
    )

    response = request.execute()

    items = response.get("items", [])

    if not items:
        return None

    video = items[0]

    return {
        "videoId": video["id"]["videoId"],
        "title": video["snippet"]["title"],
    }
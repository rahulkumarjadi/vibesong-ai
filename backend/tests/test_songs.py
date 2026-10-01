import pytest


@pytest.mark.asyncio
async def test_list_songs_empty(client):
    resp = await client.get("/api/songs")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

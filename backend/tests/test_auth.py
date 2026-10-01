import pytest


@pytest.mark.asyncio
async def test_register_and_login(client):
    register_resp = await client.post(
        "/api/auth/register",
        json={"email": "test@example.com", "username": "testuser", "password": "supersecret123"},
    )
    assert register_resp.status_code == 201
    body = register_resp.json()
    assert body["email"] == "test@example.com"

    login_resp = await client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "supersecret123"},
    )
    assert login_resp.status_code == 200
    tokens = login_resp.json()
    assert "access_token" in tokens
    assert "refresh_token" in tokens


@pytest.mark.asyncio
async def test_login_wrong_password(client):
    await client.post(
        "/api/auth/register",
        json={"email": "wrongpass@example.com", "username": "wrongpassuser", "password": "supersecret123"},
    )
    resp = await client.post(
        "/api/auth/login",
        json={"email": "wrongpass@example.com", "password": "notcorrect"},
    )
    assert resp.status_code == 401

<div align="center">
# 🎵 VibeSong AI
 
### Your Photo. Your Soundtrack.
 
Upload a photo. Discover its vibe. Find your soundtrack. 🎧
 
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_Vision-D97757)
 
</div>
---
 
VibeSong AI is an AI-powered music recommendation platform that analyzes the mood, colors, lighting, and visual characteristics of a photo and generates a personalized playlist of songs matching the photo's vibe.
 
The project combines a **React 19** frontend with a **FastAPI** backend, **Claude Vision** analysis, **JWT authentication**, and a curated multi-language music catalog.
 
## 📑 Table of Contents
 
- [Features](#-features)
- [Architecture](#️-architecture)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Seed the Song Catalog](#-seed-the-song-catalog)
- [How VibeSong AI Works](#-how-vibesong-ai-works)
- [API Endpoints](#-api-endpoints)
- [Recommendation Response](#-recommendation-response)
- [Frontend Design](#-frontend-design)
- [Testing](#-testing)
- [Docker](#-docker)
- [Database](#️-database)
- [Security](#-security)
- [Production Notes](#️-production-notes)
- [Future Improvements](#-future-improvements)
- [License](#-license)
## ✨ Features
 
- 📸 Upload a photo and analyze its visual vibe
- 🤖 AI-powered image analysis using Claude Vision
- 🎵 Personalized 20-track music recommendations
- 🇮🇳 Telugu, Hindi and English songs
- 🎹 BGM and instrumental recommendations
- 🎼 Lo-fi, classical, devotional and mood/activity playlists
- 🔐 JWT-based authentication
- 🔄 Access and refresh tokens
- ❤️ Favorite songs
- 📚 Recommendation history
- 🎧 Create and manage playlists
- 🔎 Search and filter the song catalog
- 📊 Admin analytics
- ⚡ Async FastAPI backend
- 🗄️ SQLite development database with PostgreSQL support
- 🐳 Docker support
- 🧪 Automated backend tests
## 🏗️ Architecture
 
```text
┌──────────────────────┐
│      React 19        │
│   Vite + Tailwind    │
│                      │
│  Photo Upload        │
│  Authentication      │
│  Results / Player    │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│       FastAPI        │
│                      │
│ Authentication       │
│ Photo Upload         │
│ AI Recommendations   │
│ Songs                │
│ Playlists            │
│ Favorites            │
│ History              │
└──────────┬───────────┘
           │
      ┌────┴─────┐
      ▼          ▼
┌──────────┐  ┌──────────────┐
│ Database │  │ Anthropic API│
│ SQLite / │  │ Claude Vision│
│ Postgres │  └──────────────┘
└──────────┘
```
 
## 🛠️ Tech Stack
 
### Frontend
 
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Zustand
- TanStack Query
- React Dropzone
- Lucide React
### Backend
 
- FastAPI
- Python
- SQLAlchemy 2.0
- Async SQLAlchemy
- SQLite / PostgreSQL
- Anthropic SDK
- Claude Vision
- JWT Authentication
- bcrypt
- Alembic
- slowapi
- Pytest
- Docker
## 📁 Project Structure
 
```text
vibesong-ai/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── exceptions/
│   │   ├── logging/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── tasks/
│   │   └── utils/
│   │
│   ├── database/
│   │   ├── bgm_songs.csv
│   │   ├── english_songs.csv
│   │   ├── genres.csv
│   │   ├── hindi_songs.csv
│   │   ├── schema.sql
│   │   └── telugu_songs.csv
│   │
│   ├── migrations/
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
 
## 🚀 Getting Started
 
### Prerequisites
 
- Node.js 18+
- Python 3.11+
- An [Anthropic API key](https://console.anthropic.com/)
### 1. Clone the Repository
 
```bash
git clone https://github.com/rahulkumarjadi/vibesong-ai.git
cd vibesong-ai
```
 
### 🎨 2. Frontend Setup
 
Navigate to the frontend:
 
```bash
cd frontend
```
 
Install dependencies:
 
```bash
npm install
```
 
Create your environment file:
 
```bash
cp .env.example .env
```
 
Set the backend URL in `.env`:
 
```env
VITE_API_BASE_URL=http://localhost:8000
```
 
Start the development server:
 
```bash
npm run dev
```
 
Frontend runs at:
 
```text
http://localhost:5173
```
 
### ⚙️ 3. Backend Setup
 
Open a new terminal and navigate to the backend:
 
```bash
cd backend
```
 
Create a virtual environment.
 
**Windows**
 
```powershell
python -m venv .venv
.venv\Scripts\activate
```
 
**macOS / Linux**
 
```bash
python -m venv .venv
source .venv/bin/activate
```
 
Install dependencies:
 
```bash
pip install -r requirements.txt
```
 
Create the environment file:
 
```bash
cp .env.example .env
```
 
For Windows PowerShell, you can also use:
 
```powershell
Copy-Item .env.example .env
```
 
Configure your environment variables:
 
```env
APP_NAME=VibeSong AI
ENV=development
 
SECRET_KEY=your_strong_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=30
 
DATABASE_URL=sqlite+aiosqlite:///./vibesong.db
 
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CLAUDE_MODEL=claude-sonnet-4-6
 
UPLOAD_DIR=./uploads
MAX_UPLOAD_MB=10
 
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```
 
> ⚠️ Never commit your real `.env` file or API keys to GitHub.
 
### ▶️ 4. Run the Backend
 
From the `backend` directory:
 
```bash
uvicorn main:app --reload
```
 
Backend runs at:
 
```text
http://localhost:8000
```
 
Swagger API documentation:
 
```text
http://localhost:8000/docs
```
 
## 🎵 Seed the Song Catalog
 
The backend contains curated song catalogs for multiple languages and categories.
 
Run:
 
```bash
python -m app.tasks.seed_songs
```
 
The seed process loads:
 
```text
database/telugu_songs.csv
database/hindi_songs.csv
database/english_songs.csv
database/bgm_songs.csv
```
 
Songs are matched by title and artist when possible so curated Spotify/YouTube links can be attached.
 
## 🧠 How VibeSong AI Works
 
### Step 1 — Upload Photo
 
The user uploads a photo through the React frontend.
 
```text
Photo
  ↓
React Upload UI
```
 
### Step 2 — Upload to Backend
 
The frontend sends the image to the FastAPI backend.
 
```text
POST /api/upload
```
 
The backend stores the image and returns an `upload_id`.
 
### Step 3 — AI Image Analysis
 
The uploaded image is analyzed using Claude's vision capabilities.
 
The system extracts visual characteristics such as:
 
- Mood
- Color
- Lighting
- Visual atmosphere
- Nature
- Activity
- Emotional characteristics
### Step 4 — Generate Recommendations
 
The recommendation service generates a ranked list of songs based on the image analysis.
 
The target recommendation mix:
 
```text
6 Telugu
5 Hindi
5 English
4+ BGM / Instrumental
20 Total Tracks
```
 
The recommendation system can also include categories such as:
 
- Lo-fi
- Classical
- Devotional
- Mood playlists
- Activity playlists
- Instrumentals
### Step 5 — Display Results
 
The frontend displays:
 
```text
Photo
   ↓
Image Analysis
   ↓
Vibe / Mood
   ↓
20 Recommended Songs
   ↓
Music Player
```
 
## 🔌 API Endpoints
 
### Authentication
 
```http
POST /api/auth/register
POST /api/auth/login
```
 
Returns JWT access and refresh tokens.
 
### Photo Upload
 
```http
POST /api/upload
```
 
Uploads and stores a photo.
 
### Recommendations
 
```http
POST /api/recommendations/{upload_id}
GET  /api/recommendations/{analysis_id}
```
 
Generates or retrieves AI-powered recommendations.
 
### Songs
 
```http
GET /api/songs?q=&language=&genre=
```
 
Search and filter the music catalog.
 
### Playlists
 
```http
POST /api/playlists
POST /api/playlists/{id}/songs
```
 
Create playlists and add songs.
 
### Favorites
 
```http
POST /api/favorites/{song_id}
```
 
Favorite a song.
 
### History
 
```http
GET /api/history
```
 
Retrieve previous uploads and recommendations.
 
### Analytics
 
```http
GET /api/analytics/overview
```
 
Admin-only usage analytics.
 
## 📦 Recommendation Response
 
The recommendation API returns data similar to:
 
```json
{
  "image_analysis": {
    "mood": "peaceful",
    "scores": {
      "nature": 90,
      "energy": 30,
      "romantic": 20,
      "happy": 70
    }
  },
  "recommendations": [
    {
      "rank": 1,
      "title": "Song Title",
      "confidence": 98
    }
  ]
}
```
 
## 🎨 Frontend Design
 
VibeSong AI uses a dark **film-and-frequency** aesthetic.
 
The central visual concept is the **Vibe Waveform**. The waveform uses colors extracted from the uploaded image and visually connects:
 
```text
Photo → Color Palette → Vibe Waveform → Songs
```
 
### Typography
 
| Font | Usage |
|------|-------|
| Fraunces | Display typography |
| Space Grotesk | Body / UI |
| JetBrains Mono | Data and labels |
 
## 🧪 Testing
 
From the `backend` directory:
 
```bash
pytest
```
 
Tests include:
 
```text
tests/
├── test_auth.py
├── test_health.py
└── test_songs.py
```
 
## 🐳 Docker
 
Build the backend image:
 
```bash
docker build -t vibesong-backend .
```
 
Run:
 
```bash
docker run -p 8000:8000 --env-file .env vibesong-backend
```
 
Backend will be available at:
 
```text
http://localhost:8000
```
 
## 🗄️ Database
 
Development uses SQLite by default:
 
```env
DATABASE_URL=sqlite+aiosqlite:///./vibesong.db
```
 
For PostgreSQL:
 
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/vibesong
```
 
For production, use PostgreSQL and run:
 
```bash
alembic upgrade head
```
 
instead of relying on development table auto-creation.
 
## 🔐 Security
 
Never commit:
 
```text
.env
API keys
Database passwords
JWT secrets
OAuth credentials
```
 
Use `.env.example` for safe placeholders:
 
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
SECRET_KEY=your_secret_key_here
DATABASE_URL=your_database_url_here
```
 
For production:
 
- Use a strong random `SECRET_KEY`
- Enable HTTPS
- Use PostgreSQL
- Store uploads in cloud storage
- Configure appropriate rate limits
- Keep API credentials in environment variables
## ☁️ Production Notes
 
### Database
 
Switch from SQLite to PostgreSQL.
 
### File Storage
 
The development implementation stores uploads locally. For multi-instance deployments, use object storage such as S3 and update:
 
```text
backend/app/services/upload_service.py
```
 
### HTTPS
 
Run the application behind HTTPS.
 
### Rate Limiting
 
Tune the limits in:
 
```text
backend/app/utils/rate_limit.py
```
 
according to production traffic.
 
## 🔮 Future Improvements
 
- Spotify integration
- YouTube Music integration
- Cloud image storage
- Production PostgreSQL deployment
- Redis caching
- Advanced recommendation models
- User preference learning
- Playlist sharing
- Social features
- Mobile application
- Real-time music playback
- Improved AI personalization
## 📄 License
 
This project is currently intended for educational and development purposes.
 
---
 
<div align="center">
### 🎵 VibeSong AI
 
**Your Photo. Your Soundtrack.**
 
Upload a photo. Discover its vibe. Find your soundtrack. 🎧
 
</div>
 `
# VibeSong AI — Frontend

**Your Photo. Your Soundtrack.**

React 19 + Vite + Tailwind frontend for VibeSong AI. Upload a photo, get a
20-track playlist matched to its mood, color, and light.

## Stack
- React 19, Vite
- Tailwind CSS
- Framer Motion
- React Router
- Zustand (state)
- TanStack Query (async/caching)
- react-dropzone, lucide-react

## Getting started
```bash
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## How recommendations work right now
There's no backend wired up yet, so `src/api/uploadApi.js` runs the whole
pipeline client-side as a stand-in:

1. `src/utils/colorExtract.js` reads the uploaded photo into a canvas and
   pulls dominant colors, brightness, and warmth.
2. `src/utils/mockEngine.js` turns that into an `image_analysis` object and
   scores/ranks a local song catalog (`src/constants/songPool.js`) against it,
   enforcing the same quotas the real AI prompt is meant to (6 Telugu, 5
   Hindi, 5 English, 4 BGM/Instrumental minimum, 20 total).

## Wiring up the real backend
Replace the body of `analyzePhoto()` in `src/api/uploadApi.js` with a call to
your FastAPI endpoint (see `src/api/axios.js`), which should upload the image
and return the same JSON shape:

```json
{
  "image_analysis": { "mood": "...", "scores": { "nature": 0, "...": 0 } },
  "recommendations": [ { "rank": 1, "title": "...", "confidence": 98 } ]
}
```

Set `VITE_API_BASE_URL` in `.env` to point at it.

## Project structure
```
src/
├── api/            # axios instance + API calls
├── components/     # Navbar, Footer, SongCard, PhotoDropzone, VibeWaveform...
├── constants/       # music.js, songPool.js
├── layouts/        # MainLayout
├── pages/          # Home, Results, About, NotFound
├── routes/         # AppRoutes
├── store/          # zustand vibeStore
└── utils/          # colorExtract, mockEngine
```

## Design
Dark, film-and-frequency aesthetic: a "vibe waveform" — colored from each
photo's own palette — is the visual thread between the image and the songs it
recommends. Display type is Fraunces, body/UI is Space Grotesk, data/labels
are set in JetBrains Mono.

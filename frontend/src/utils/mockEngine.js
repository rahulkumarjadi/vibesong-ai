import { SONG_POOL } from '../constants/songPool'

const SCENES = ['Urban skyline', 'Beach at golden hour', 'Mountain trail', 'Cozy indoor room', 'Rainy street', 'Festival crowd', 'Quiet café', 'Forest path', 'Night city drive', 'Temple courtyard']
const LOCATIONS = ['Outdoor', 'Indoor', 'Urban', 'Nature', 'Coastal', 'Mountain']
const OBJECT_BANK = ['sky', 'clouds', 'trees', 'people', 'building', 'lights', 'water', 'road', 'flowers', 'shadows', 'skyline', 'candles']

function seededPick(arr, seed) {
  const idx = Math.floor(Math.abs(seed) % arr.length)
  return arr[idx]
}

function moodFromHueWarmth(hue, brightness, warmth) {
  if (brightness < 70) return { mood: 'Moody & Reflective', emotion: 'Introspective', energy: 'Low', aesthetic: 'Dark & Cinematic' }
  if (warmth > 25 && brightness > 140) return { mood: 'Nostalgic & Warm', emotion: 'Joyful', energy: 'Medium', aesthetic: 'Golden Hour' }
  if (warmth < -20) return { mood: 'Calm & Melancholic', emotion: 'Wistful', energy: 'Low', aesthetic: 'Cool & Cinematic' }
  if (brightness > 190) return { mood: 'Bright & Energetic', emotion: 'Excited', energy: 'High', aesthetic: 'Vivid & Airy' }
  return { mood: 'Fresh & Grounded', emotion: 'Content', energy: 'Medium', aesthetic: 'Natural & Warm' }
}

function scoreFor(base, jitterSeed) {
  const jitter = (Math.sin(jitterSeed) * 8)
  return Math.max(4, Math.min(96, Math.round(base + jitter)))
}

export function buildImageAnalysis({ palette, primaryColors, secondaryColors, brightness, warmth }) {
  const seed = (primaryColors[0] || '#000000').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const { mood, emotion, energy, aesthetic } = moodFromHueWarmth(palette[0]?.h || 0, brightness, warmth)
  const scene = seededPick(SCENES, seed)
  const location = seededPick(LOCATIONS, seed * 3)
  const timeOfDay = brightness > 170 ? 'Day' : brightness > 90 ? 'Evening' : 'Night'
  const weather = warmth < -15 ? 'Overcast' : brightness > 190 ? 'Clear' : 'Mild'
  const isNature = seed % 2 === 0
  const objects = [OBJECT_BANK[seed % OBJECT_BANK.length], OBJECT_BANK[(seed + 3) % OBJECT_BANK.length], OBJECT_BANK[(seed + 5) % OBJECT_BANK.length]]

  return {
    mood,
    emotion,
    scene,
    location_type: location,
    weather,
    time_of_day: timeOfDay,
    season: brightness > 160 && warmth > 10 ? 'Summer' : warmth < -20 ? 'Winter' : 'Spring',
    lighting: brightness > 170 ? 'Bright, high-key' : brightness > 90 ? 'Soft, ambient' : 'Low-key, dramatic',
    energy,
    aesthetic,
    primary_colors: primaryColors,
    secondary_colors: secondaryColors,
    objects,
    keywords: [aesthetic.toLowerCase(), mood.split(' ')[0].toLowerCase(), timeOfDay.toLowerCase(), location.toLowerCase(), weather.toLowerCase()],
    scores: {
      nature: scoreFor(isNature ? 68 : 32, seed),
      urban: scoreFor(isNature ? 32 : 68, seed + 1),
      romantic: scoreFor(warmth > 10 ? 62 : 38, seed + 2),
      adventure: scoreFor(energy === 'High' ? 70 : 40, seed + 3),
      party: scoreFor(energy === 'High' ? 66 : 28, seed + 4),
      calm: scoreFor(energy === 'Low' ? 72 : 34, seed + 5),
    },
  }
}

const GENRE_TO_MUSICTYPE = {
  'Movie BGM': 'Movie BGM',
  Instrumental: 'Instrumental',
  'Lo-fi': 'Lo-fi',
  Classical: 'Classical',
  Devotional: 'Devotional',
  Epic: 'Epic',
  Meditation: 'Meditation',
}

function moodAffinity(song, analysis) {
  let score = 50
  if (song.energy === analysis.energy) score += 18
  const moodWord = analysis.mood.split(' ')[0].toLowerCase()
  if (song.mood.toLowerCase().includes(moodWord.slice(0, 4))) score += 14
  if (analysis.keywords.some((k) => song.genre.toLowerCase().includes(k) || song.mood.toLowerCase().includes(k))) score += 10
  if (analysis.time_of_day === 'Night' && (song.genre === 'Night Drive' || song.genre === 'Chill')) score += 12
  if (analysis.weather === 'Overcast' && song.genre === 'Rain') score += 16
  if (analysis.scores.romantic > 60 && song.genre === 'Romantic') score += 12
  if (analysis.scores.party > 55 && song.genre === 'Party') score += 12
  if (analysis.scores.calm > 60 && ['Lo-fi', 'Study', 'Chill', 'Meditation'].includes(song.genre)) score += 10
  if (analysis.scores.adventure > 55 && song.genre === 'Travel') score += 8
  return score
}

export function buildRecommendations(analysis, favoriteLanguage = 'Telugu') {
  const scored = SONG_POOL.map((song, i) => {
    let score = moodAffinity(song, analysis)
    if (song.language === favoriteLanguage) score += 10
    score += Math.sin(i * 12.9898) * 6 // small deterministic jitter for variety
    return { ...song, _score: score }
  }).sort((a, b) => b._score - a._score)

  const picked = []
  const usedTitles = new Set()

  function tryAdd(predicate, count) {
    let added = 0
    for (const song of scored) {
      if (added >= count) break
      if (usedTitles.has(song.title)) continue
      if (!predicate(song)) continue
      picked.push(song)
      usedTitles.add(song.title)
      added += 1
    }
  }

  // Quotas from the recommendation spec
  tryAdd((s) => s.language === 'Telugu', 6)
  tryAdd((s) => s.language === 'Hindi', 5)
  tryAdd((s) => s.language === 'English', 5)
  tryAdd((s) => s.genre === 'Movie BGM' || s.genre === 'Instrumental' || s.genre === 'Epic', 4)

  // Fill remaining slots up to 20 with highest scoring unused songs
  for (const song of scored) {
    if (picked.length >= 20) break
    if (usedTitles.has(song.title)) continue
    picked.push(song)
    usedTitles.add(song.title)
  }

  return picked.slice(0, 20).map((song, idx) => {
    const confidence = Math.max(61, Math.min(99, Math.round(80 + song._score / 8 - idx * 0.6)))
    const durationSec = 150 + ((song.title.length * 7) % 120)
    const mm = Math.floor(durationSec / 60)
    const ss = String(durationSec % 60).padStart(2, '0')
    const query = encodeURIComponent(`${song.title} ${song.artist}`)
    return {
      rank: idx + 1,
      title: song.title,
      artist: song.artist,
      album: song.movie !== '—' ? song.movie : song.title,
      movie: song.movie,
      composer: song.artist.split(',')[0],
      singer: song.artist,
      language: song.language,
      genre: song.genre,
      music_type: GENRE_TO_MUSICTYPE[song.genre] || song.genre,
      mood: song.mood,
      energy: song.energy,
      tempo: song.tempo,
      reason: reasonFor(song, analysis),
      confidence,
      spotify_url: `https://open.spotify.com/search/${query}`,
      youtube_url: `https://www.youtube.com/results?search_query=${query}`,
      album_cover: null,
      preview_url: null,
      duration: `${mm}:${ss}`,
      popularity: Math.max(40, Math.min(99, Math.round(60 + (song._score - 50)))),
      release_year: song.year,
    }
  })
}

function reasonFor(song, analysis) {
  return `Matches the ${analysis.mood.toLowerCase()} tone and ${analysis.lighting.toLowerCase()} lighting of your photo, with a ${song.energy.toLowerCase()}-energy ${song.genre.toLowerCase()} feel.`
}

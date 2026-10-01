import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout.jsx'
import PhotoDropzone from '../components/PhotoDropzone.jsx'
import VibeWaveform from '../components/VibeWaveform.jsx'
import { useVibeStore } from '../store/vibeStore'
import { LANGUAGES, MUSIC_TYPES } from '../constants/music'

export default function Home() {
  const navigate = useNavigate()
  const { setPhoto, photo } = useVibeStore()
  const [localPreview, setLocalPreview] = useState(photo?.previewUrl || null)

  const handleSelect = (file) => {
    const url = URL.createObjectURL(file)
    setLocalPreview(url)
    setPhoto({ file, previewUrl: url })
  }

  const handleClear = () => {
    setLocalPreview(null)
    setPhoto(null)
  }

  const handleContinue = () => {
    if (localPreview) navigate('/results')
  }

  return (
    <MainLayout>
      <section className="grid lg:grid-cols-2 gap-12 items-center pt-8 lg:pt-16">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-teal border border-teal/30 rounded-full px-3 py-1 mb-6">
            <VibeWaveform size="sm" heights={[0.4, 0.9, 0.5]} colors={['#4FD8C4']} />
            AI-powered mood matching
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
            Your photo.
            <br />
            <span className="italic text-amber">Your soundtrack.</span>
          </h1>
          <p className="text-muted mt-5 max-w-md">
            Upload any photo. VibeSong reads its color, light, and mood, then builds a
            20-track playlist across Telugu, Hindi, English and more — matched to exactly
            how the moment feels.
          </p>

          {localPreview && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleContinue}
              className="mt-8 inline-flex items-center gap-2 bg-amber text-void font-medium px-6 py-3 rounded-full hover:brightness-110 transition"
            >
              Find my soundtrack →
            </motion.button>
          )}

          <div className="flex items-center gap-6 mt-10 text-xs text-muted font-mono">
            <span>18+ languages</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>30+ music types</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>20 tracks per photo</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <PhotoDropzone preview={localPreview} onSelect={handleSelect} onClear={handleClear} />
        </div>
      </section>

      <section id="supported" className="mt-32">
        <p className="text-xs uppercase tracking-wider text-muted font-mono mb-3">Supported languages</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {LANGUAGES.map((lang) => (
            <span key={lang} className="text-sm px-3 py-1.5 rounded-full border border-line text-ink/80">{lang}</span>
          ))}
        </div>

        <p className="text-xs uppercase tracking-wider text-muted font-mono mb-3">Music types &amp; moods</p>
        <div className="flex flex-wrap gap-2">
          {MUSIC_TYPES.map((type) => (
            <span key={type} className="text-sm px-3 py-1.5 rounded-full border border-line text-ink/80">{type}</span>
          ))}
        </div>
      </section>
    </MainLayout>
  )
}

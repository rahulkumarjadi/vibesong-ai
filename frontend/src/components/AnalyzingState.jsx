import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import VibeWaveform from './VibeWaveform'

const STEPS = [
  'Reading light and color…',
  'Detecting mood and scene…',
  'Matching tempo and energy…',
  'Ranking your soundtrack…',
]

export default function AnalyzingState({ preview }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
    }, 700)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20 text-center">
      <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-line">
        {preview && <img src={preview} alt="Analyzing" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/70" />
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-vibe-gradient"
          animate={{ top: ['4%', '96%', '4%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <VibeWaveform size="lg" />

      <div className="h-6">
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-mono text-teal/90"
        >
          {STEPS[stepIndex]}
        </motion.p>
      </div>
    </div>
  )
}

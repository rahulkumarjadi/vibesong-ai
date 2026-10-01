import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { ImagePlus, X } from 'lucide-react'

export default function PhotoDropzone({ onSelect, preview, onClear }) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((accepted) => {
    const file = accepted[0]
    if (!file) return
    onSelect(file)
  }, [onSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
  })

  if (preview) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-line group">
        <img src={preview} alt="Uploaded" className="w-full h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
        <button
          onClick={onClear}
          className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full bg-void/70 backdrop-blur border border-line hover:border-amber/60 transition-colors"
          aria-label="Remove photo"
        >
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 h-[420px] flex flex-col items-center justify-center gap-5 px-8 text-center
        ${isDragActive || dragActive ? 'border-teal/70 bg-teal/5' : 'border-line hover:border-amber/50 bg-surface/40'}`}
    >
      <input {...getInputProps()} />
      <motion.div
        animate={{ y: isDragActive ? -6 : 0 }}
        className="grid place-items-center w-16 h-16 rounded-full bg-surface2 border border-line"
      >
        <ImagePlus size={26} className="text-amber" />
      </motion.div>
      <div>
        <p className="font-display text-xl text-balance">Drop a photo, find its soundtrack</p>
        <p className="text-muted text-sm mt-2 max-w-xs mx-auto">
          JPG, PNG, or WEBP. We read the light, color, and mood — nothing is stored.
        </p>
      </div>
      <span className="text-xs font-mono text-teal/80 border border-teal/30 rounded-full px-3 py-1">Click to browse or drag &amp; drop</span>
    </div>
  )
}

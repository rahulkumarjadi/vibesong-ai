// The signature element of VibeSong AI: a waveform that visually bridges
// "photo" and "song" — its bars are colored by the dominant palette pulled
// from the uploaded image, and it animates like an equalizer while analyzing.

const DEFAULT_HEIGHTS = [0.4, 0.7, 0.35, 0.9, 0.5, 0.8, 0.3, 0.6, 0.95, 0.45, 0.7, 0.4, 0.85, 0.55, 0.3, 0.65, 0.4, 0.75, 0.5, 0.35]

export default function VibeWaveform({ colors = ['#F2A65A', '#8B7FC7', '#4FD8C4'], animated = true, heights = DEFAULT_HEIGHTS, size = 'md' }) {
  const barHeight = size === 'lg' ? 'h-16' : size === 'sm' ? 'h-8' : 'h-12'

  return (
    <div className={`flex items-end gap-[3px] ${barHeight}`} role="img" aria-label="Vibe waveform visualization">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full ${animated ? 'animate-wave' : ''}`}
          style={{
            height: `${h * 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${i * 0.045}s`,
            opacity: animated ? 1 : 0.55 + h * 0.4,
          }}
        />
      ))}
    </div>
  )
}

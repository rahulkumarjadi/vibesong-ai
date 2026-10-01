// import { AnimatePresence, motion } from 'framer-motion'
// import { Play, Pause, X } from 'lucide-react'
// import { useVibeStore } from '../store/vibeStore'
// import VibeWaveform from './VibeWaveform'

// export default function MusicPlayer() {
//   const { activeSong, isPlaying, togglePlay, closePlayer } = useVibeStore((s) => ({
//     activeSong: s.activeSong,
//     isPlaying: s.isPlaying,
//     togglePlay: s.togglePlay,
//     closePlayer: s.closePlayer,
//   }))

//   return (
//     <AnimatePresence>
//       {activeSong && (
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 100, opacity: 0 }}
//           transition={{ type: 'spring', stiffness: 260, damping: 28 }}
//           className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl"
//         >
//           <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface2/90 backdrop-blur-xl px-4 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
//             <button
//               onClick={togglePlay}
//               className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-amber text-void"
//               aria-label={isPlaying ? 'Pause' : 'Play'}
//             >
//               {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
//             </button>

//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-medium truncate">{activeSong.title}</p>
//               <p className="text-xs text-muted truncate">{activeSong.artist}</p>
//             </div>

//             <div className="hidden sm:block">
//               <VibeWaveform size="sm" animated={isPlaying} colors={['#F2A65A', '#4FD8C4']} />
//             </div>

//             <button
//               onClick={closePlayer}
//               className="shrink-0 grid place-items-center w-8 h-8 rounded-full text-muted hover:text-ink hover:bg-surface transition-colors"
//               aria-label="Close player"
//             >
//               <X size={14} />
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }




import { AnimatePresence, motion } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';
import { useVibeStore } from '../store/vibeStore';
import VibeWaveform from './VibeWaveform';

export default function MusicPlayer() {
  // ✅ Use separate selectors instead of returning an object
  const activeSong = useVibeStore((state) => state.activeSong);
  const isPlaying = useVibeStore((state) => state.isPlaying);
  const togglePlay = useVibeStore((state) => state.togglePlay);
  const closePlayer = useVibeStore((state) => state.closePlayer);

  return (
    <AnimatePresence>
      {activeSong && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface2/90 backdrop-blur-xl px-4 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
            <button
              onClick={togglePlay}
              className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-amber text-void"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={16} />
              ) : (
                <Play size={16} className="ml-0.5" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {activeSong.title}
              </p>
              <p className="text-xs text-muted truncate">
                {activeSong.artist}
              </p>
            </div>

            <div className="hidden sm:block">
              <VibeWaveform
                size="sm"
                animated={isPlaying}
                colors={['#F2A65A', '#4FD8C4']}
              />
            </div>

            <button
              onClick={closePlayer}
              className="shrink-0 grid place-items-center w-8 h-8 rounded-full text-muted hover:text-ink hover:bg-surface transition-colors"
              aria-label="Close player"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
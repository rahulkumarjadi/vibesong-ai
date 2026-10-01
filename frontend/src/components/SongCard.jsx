// import { motion } from 'framer-motion'
// import { Play, Pause, ExternalLink, Youtube } from 'lucide-react'
// import { useVibeStore } from '../store/vibeStore'

// const GENRE_COLORS = {
//   Romantic: 'bg-amber/15 text-amber-soft border-amber/30',
//   Sad: 'bg-violet/15 text-violet-soft border-violet/30',
//   Happy: 'bg-teal/15 text-teal-soft border-teal/30',
//   Party: 'bg-amber/15 text-amber-soft border-amber/30',
// }

// // const handlePlay = async () => {
// //   const res = await axios.get("http://localhost:8000/api/spotify/search", {
// //     params: {
// //       title: song.title,
// //       artist: song.artist,
// //     },
// //   });

// //   if (res.data.preview_url) {
// //     const audio = new Audio(res.data.preview_url);
// //     audio.play();
// //   } else {
// //     alert("Preview not available");
// //   }
// // };

// // export default function SongCard({ song, index }) {
// //   const { activeSong, isPlaying, playSong } = useVibeStore()
// //   const isActive = activeSong?.title === song.title

// //   const genreClass = GENRE_COLORS[song.genre] || 'bg-surface2 text-muted border-line'

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 12 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: Math.min(index * 0.035, 0.6), duration: 0.4 }}
// //       className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-colors
// //         ${isActive ? 'border-teal/50 bg-teal/[0.06]' : 'border-line bg-surface/60 hover:bg-surface2/70'}`}
// //     >
// //       <span className="w-6 shrink-0 text-center font-mono text-xs text-muted">{String(song.rank).padStart(2, '0')}</span>

// //       <button
// //         onClick={() => playSong(song)}
// //         className="shrink-0 grid place-items-center w-11 h-11 rounded-lg bg-surface2 border border-line hover:border-amber/50 transition-colors"
// //         aria-label={isActive && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
// //       >
// //         {isActive && isPlaying ? <Pause size={16} className="text-amber" /> : <Play size={16} className="text-ink ml-0.5" />}
// //       </button>

// //       <div className="min-w-0 flex-1">
// //         <div className="flex items-baseline gap-2">
// //           <p className="font-body font-medium text-ink truncate">{song.title}</p>
// //           <span className="text-xs text-muted shrink-0 font-mono">{song.release_year}</span>
// //         </div>
// //         <p className="text-sm text-muted truncate">{song.artist} {song.movie !== '—' ? `· ${song.movie}` : ''}</p>
// //       </div>

// //       <div className="hidden md:flex items-center gap-2 shrink-0">
// //         <span className="text-[11px] px-2 py-1 rounded-full border border-line text-muted font-mono">{song.language}</span>
// //         <span className={`text-[11px] px-2 py-1 rounded-full border font-mono ${genreClass}`}>{song.genre}</span>
// //       </div>

// //       <div className="hidden lg:flex flex-col items-end shrink-0 w-20">
// //         <span className="text-xs font-mono text-teal">{song.confidence}%</span>
// //         <span className="text-[11px] text-muted font-mono">{song.duration}</span>
// //       </div>

// //       <div className="hidden sm:flex items-center gap-1 shrink-0">
// //         <a
// //           href={song.spotify_url}
// //           target="_blank"
// //           rel="noreferrer"
// //           className="grid place-items-center w-8 h-8 rounded-full text-muted hover:text-teal hover:bg-surface2 transition-colors"
// //           aria-label={`Open ${song.title} on Spotify`}
// //         >
// //           <ExternalLink size={14} />
// //         </a>
// //         <a
// //           href={song.youtube_url}
// //           target="_blank"
// //           rel="noreferrer"
// //           className="grid place-items-center w-8 h-8 rounded-full text-muted hover:text-amber hover:bg-surface2 transition-colors"
// //           aria-label={`Search ${song.title} on YouTube`}
// //         >
// //           <Youtube size={14} />
// //         </a>
// //       </div>
// //     </motion.div>
// //   )
// // }



// // export default function SongCard({ song, index }) {
// //   const { activeSong, isPlaying, playSong } = useVibeStore();

// //   const handlePlay = async () => {
// //     playSong(song);

// //     try {
// //       const res = await axios.get(
// //         "http://localhost:8000/api/spotify/search",
// //         {
// //           params: {
// //             title: song.title,
// //             artist: song.artist,
// //           },
// //         }
// //       );

// //       if (res.data.preview_url) {
// //         const audio = new Audio(res.data.preview_url);
// //         audio.play();
// //       } else {
// //         alert("Preview not available");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// // }


// // import { useVibeStore } from "../store/vibeStore";

// const handlePlay = async () => {
//   try {
//     const res = await axios.get(
//       "http://localhost:8000/api/youtube/search",
//       {
//         params: {
//           title: song.title,
//           artist: song.artist,
//         },
//       }
//     );

//     playSong({
//       ...song,
//       videoId: res.data.videoId,
//     });

//   } catch (err) {
//     console.error(err);
//     alert("Unable to play this song");
//   }
// };




import axios from "axios";
import { motion } from "framer-motion";
import { Play, Pause, ExternalLink, Youtube } from "lucide-react";
import { useVibeStore } from "../store/vibeStore";

const GENRE_COLORS = {
  Romantic: "bg-amber/15 text-amber-soft border-amber/30",
  Sad: "bg-violet/15 text-violet-soft border-violet/30",
  Happy: "bg-teal/15 text-teal-soft border-teal/30",
  Party: "bg-amber/15 text-amber-soft border-amber/30",
};

export default function SongCard({ song, index }) {
  const { activeSong, isPlaying, playSong } = useVibeStore();

  const isActive = activeSong?.title === song.title;

  const genreClass =
    GENRE_COLORS[song.genre] ||
    "bg-surface2 text-muted border-line";

  const handlePlay = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/youtube/search",
        {
          params: {
            title: song.title,
            artist: song.artist,
          },
        }
      );

      playSong({
        ...song,
        videoId: res.data.videoId,
      });
    } catch (err) {
      console.error(err);
      alert("Unable to play song");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.035, 0.6),
        duration: 0.4,
      }}
      className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-colors
      ${isActive
          ? "border-teal/50 bg-teal/[0.06]"
          : "border-line bg-surface/60 hover:bg-surface2/70"
        }`}
    >
      <span className="w-6 shrink-0 text-center font-mono text-xs text-muted">
        {String(song.rank).padStart(2, "0")}
      </span>

      <button
        onClick={handlePlay}
        className="shrink-0 grid place-items-center w-11 h-11 rounded-lg bg-surface2 border border-line hover:border-amber/50 transition-colors"
      >
        {isActive && isPlaying ? (
          <Pause size={16} />
        ) : (
          <Play size={16} />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="font-body font-medium text-ink truncate">
            {song.title}
          </p>

          <span className="text-xs text-muted">
            {song.release_year}
          </span>
        </div>

        <p className="text-sm text-muted truncate">
          {song.artist}
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <span className="text-[11px] px-2 py-1 rounded-full border border-line">
          {song.language}
        </span>

        <span
          className={`text-[11px] px-2 py-1 rounded-full border ${genreClass}`}
        >
          {song.genre}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <a
          href={song.spotify_url}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={16} />
        </a>

        <a
          href={song.youtube_url}
          target="_blank"
          rel="noreferrer"
        >
          <Youtube size={16} />
        </a>
      </div>
    </motion.div>
  );
}
// import { create } from 'zustand'

// export const useVibeStore = create((set) => ({
//   photo: null, // { file, previewUrl }
//   status: 'idle', // idle | analyzing | done | error
//   analysis: null,
//   recommendations: [],
//   activeSong: null,
//   isPlaying: false,
//   languageFilter: 'All',
//   favoriteLanguage: 'Telugu',

//   setPhoto: (photo) => set({ photo, status: 'idle', analysis: null, recommendations: [] }),
//   setStatus: (status) => set({ status }),
//   setResult: (analysis, recommendations) => set({ analysis, recommendations, status: 'done' }),
//   reset: () => set({ photo: null, status: 'idle', analysis: null, recommendations: [], activeSong: null, isPlaying: false }),
//   setLanguageFilter: (languageFilter) => set({ languageFilter }),
//   setFavoriteLanguage: (favoriteLanguage) => set({ favoriteLanguage }),
//   playSong: (song) => set((state) => ({
//     activeSong: song,
//     isPlaying: state.activeSong?.title === song.title ? !state.isPlaying : true,
//   })),
//   togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
//   closePlayer: () => set({ activeSong: null, isPlaying: false }),
// }))




import { create } from "zustand";

export const useVibeStore = create((set) => ({
  photo: null,
  status: "idle",
  analysis: null,
  recommendations: [],

  activeSong: null,
  isPlaying: false,
  videoId: null,

  languageFilter: "All",
  favoriteLanguage: "Telugu",

  setPhoto: (photo) =>
    set({
      photo,
      status: "idle",
      analysis: null,
      recommendations: [],
    }),

  setStatus: (status) =>
    set({
      status,
    }),

  setResult: (analysis, recommendations) =>
    set({
      analysis,
      recommendations,
      status: "done",
    }),

  reset: () =>
    set({
      photo: null,
      status: "idle",
      analysis: null,
      recommendations: [],
      activeSong: null,
      isPlaying: false,
      videoId: null,
    }),

  setLanguageFilter: (languageFilter) =>
    set({
      languageFilter,
    }),

  setFavoriteLanguage: (favoriteLanguage) =>
    set({
      favoriteLanguage,
    }),

  playSong: (song) =>
    set({
      activeSong: song,
      videoId: song.videoId || null,
      isPlaying: true,
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  closePlayer: () =>
    set({
      activeSong: null,
      isPlaying: false,
      videoId: null,
    }),
}));
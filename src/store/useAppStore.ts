import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Playlist, Video, VideoProgress, UserStats } from '../types';

interface AppState {
  darkMode: boolean;
  playlists: Playlist[];
  videoProgress: Record<string, VideoProgress>;
  currentVideo: Video | null;
  userStats: UserStats;
  searchResults: Video[];
  isSearching: boolean;
  toggleDarkMode: () => void;
  toggleSearchMode: () => void;
  setSearchResults: (videos: Video[]) => void;
  addPlaylist: (playlist: Playlist) => void;
  updatePlaylist: (playlistId: string, updates: Partial<Playlist>) => void;
  removePlaylist: (playlistId: string) => void;
  addVideoToPlaylist: (playlistId: string, video: Video) => void;
  removeVideoFromPlaylist: (playlistId: string, videoId: string) => void;
  setCurrentVideo: (video: Video | null) => void;
  updateVideoProgress: (videoId: string, timestamp: number, duration: number) => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      playlists: [],
      videoProgress: {},
      currentVideo: null,
      userStats: {
        totalWatchTime: 0,
        completedVideos: 0,
        currentStreak: 1,
        longestStreak: 1,
      },
      searchResults: [],
      isSearching: false,
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      toggleSearchMode: () => set((state) => ({ isSearching: !state.isSearching })),
      
      setSearchResults: (videos) => set({ searchResults: videos }),
      
      addPlaylist: (playlist) => set((state) => ({ 
        playlists: [...state.playlists, playlist] 
      })),
      
      updatePlaylist: (playlistId, updates) => set((state) => ({
        playlists: state.playlists.map((playlist) => 
          playlist.id === playlistId 
            ? { ...playlist, ...updates } 
            : playlist
        )
      })),
      
      removePlaylist: (playlistId) => set((state) => ({
        playlists: state.playlists.filter(playlist => playlist.id !== playlistId)
      })),
      
      addVideoToPlaylist: (playlistId, video) => set((state) => ({
        playlists: state.playlists.map(playlist => 
          playlist.id === playlistId
            ? { 
                ...playlist, 
                videos: [...playlist.videos.filter(v => v.id !== video.id), video] 
              }
            : playlist
        )
      })),
      
      removeVideoFromPlaylist: (playlistId, videoId) => set((state) => ({
        playlists: state.playlists.map(playlist => 
          playlist.id === playlistId
            ? { 
                ...playlist, 
                videos: playlist.videos.filter(video => video.id !== videoId) 
              }
            : playlist
        )
      })),
      
      setCurrentVideo: (video) => set({ currentVideo: video }),
      
      updateVideoProgress: (videoId, timestamp, duration) => set((state) => {
        const completed = timestamp >= duration * 0.9;
        const existingProgress = state.videoProgress[videoId];
        const lastWatched = new Date().toISOString();
        
        // Calculate incremental watch time for stats
        const previousTimestamp = existingProgress?.timestamp || 0;
        const incrementalWatchTime = Math.max(0, timestamp - previousTimestamp);
        
        // Update stats if the video is completed and wasn't before
        const stats = { ...state.userStats };
        stats.totalWatchTime += incrementalWatchTime;
        
        if (completed && (!existingProgress || !existingProgress.completed)) {
          stats.completedVideos += 1;
        }
        
        return {
          videoProgress: {
            ...state.videoProgress,
            [videoId]: {
              videoId,
              timestamp,
              duration,
              lastWatched,
              completed,
            },
          },
          userStats: stats,
        };
      }),
      
      updateUserStats: (stats) => set((state) => ({
        userStats: { ...state.userStats, ...stats }
      })),
    }),
    {
      name: 'youtube-learning-tracker-storage',
    }
  )
);
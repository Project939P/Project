export interface Video {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  duration?: string;
  playlistId?: string;
}

export interface VideoProgress {
  videoId: string;
  timestamp: number;
  duration: number;
  lastWatched: string;
  completed: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  videos: Video[];
  createdAt: string;
}

export interface UserStats {
  totalWatchTime: number;
  completedVideos: number;
  currentStreak: number;
  longestStreak: number;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ListPlus, Clock, Calendar } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VideoPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { currentVideo, videoProgress, updateVideoProgress, playlists } = useAppStore();
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);
  const initializeAttempts = useRef(0);
  
  // If no video is selected, redirect to dashboard
  useEffect(() => {
    if (!currentVideo) {
      navigate('/');
      return;
    }
  }, [currentVideo, navigate]);
  
  const initializePlayer = () => {
    if (!currentVideo || !playerRef.current) return;
    
    try {
      const videoId = currentVideo.id;
      
      // Get saved progress
      const savedProgress = videoProgress[videoId];
      const startTime = savedProgress ? Math.max(0, savedProgress.timestamp - 2) : 0;
      
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }
      
      ytPlayerRef.current = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
          start: Math.floor(startTime),
          autoplay: 1,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: (event: any) => {
            console.error('YouTube Player Error:', event.data);
            setLoadError('Error loading video. Please try again.');
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error('Error initializing player:', error);
      setLoadError('Error initializing video player. Please refresh the page.');
      setIsLoading(false);
    }
  };
  
  // Load YouTube API
  useEffect(() => {
    if (!currentVideo) return;
    
    const loadYouTubeAPI = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.YT) {
          resolve();
          return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onerror = () => reject(new Error('Failed to load YouTube IFrame API'));
        
        window.onYouTubeIframeAPIReady = () => {
          resolve();
        };
        
        document.body.appendChild(tag);
      });
    };

    const initializeYouTubePlayer = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        await loadYouTubeAPI();
        initializePlayer();
      } catch (error) {
        console.error('Error loading YouTube API:', error);
        setLoadError('Error loading YouTube player. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initializeYouTubePlayer();

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }
    };
  }, [currentVideo]);
  
  const onPlayerReady = (event: any) => {
    setIsLoading(false);
    setLoadError(null);
    setDuration(event.target.getDuration());
    
    // Start progress tracking
    timerRef.current = window.setInterval(() => {
      if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
        const currentTime = ytPlayerRef.current.getCurrentTime();
        setCurrentTime(currentTime);
        
        // Save progress every 5 seconds
        if (Math.floor(currentTime) % 5 === 0) {
          updateVideoProgress(
            currentVideo!.id,
            currentTime,
            ytPlayerRef.current.getDuration()
          );
        }
      }
    }, 1000);
  };
  
  const onPlayerStateChange = (event: any) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
    
    // When video ends
    if (event.data === window.YT.PlayerState.ENDED) {
      saveVideoProgress(true);
      toast.success('Video completed! Great job!');
    }
    
    // When video is paused
    if (event.data === window.YT.PlayerState.PAUSED) {
      saveVideoProgress();
    }
  };
  
  const saveVideoProgress = (completed = false) => {
    if (!currentVideo || !ytPlayerRef.current) return;
    
    const currentTime = ytPlayerRef.current.getCurrentTime();
    const duration = ytPlayerRef.current.getDuration();
    
    updateVideoProgress(
      currentVideo.id,
      currentTime,
      duration,
      completed
    );
  };

  if (!currentVideo) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Video player */}
          <div className="bg-black aspect-video rounded-lg overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            )}
            {loadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center p-4">
                  <p className="text-red-500 mb-2">{loadError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
            <div ref={playerRef} className="w-full h-full"></div>
          </div>
          
          {/* Video details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mt-4 p-4">
            <h1 className="text-xl font-bold mb-2">{currentVideo.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="mr-3">{currentVideo.channelTitle}</span>
              <span>
                {new Date(currentVideo.publishedAt).toLocaleDateString()}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-4 border-t dark:border-gray-700 pt-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {currentVideo.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default VideoPlayer;
import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Activity, TrendingUp, Clock, Target } from 'lucide-react';

const RealTimeStats: React.FC = () => {
  const { userStats, videoProgress, darkMode } = useAppStore();
  const [liveStats, setLiveStats] = useState({
    sessionsToday: 0,
    averageSessionLength: 0,
    completionRate: 0,
    weeklyGoalProgress: 0,
  });

  useEffect(() => {
    const calculateLiveStats = () => {
      const today = new Date().toDateString();
      const todayProgress = Object.values(videoProgress).filter(
        progress => new Date(progress.lastWatched).toDateString() === today
      );

      const sessionsToday = todayProgress.length;
      const totalTimeToday = todayProgress.reduce((sum, progress) => sum + progress.timestamp, 0);
      const averageSessionLength = sessionsToday > 0 ? totalTimeToday / sessionsToday : 0;
      
      const completedToday = todayProgress.filter(p => p.completed).length;
      const completionRate = sessionsToday > 0 ? (completedToday / sessionsToday) * 100 : 0;
      
      // Weekly goal: 5 hours of learning
      const weeklyGoal = 5 * 3600; // 5 hours in seconds
      const thisWeekProgress = Math.min((userStats.totalWatchTime / weeklyGoal) * 100, 100);

      setLiveStats({
        sessionsToday,
        averageSessionLength,
        completionRate,
        weeklyGoalProgress: thisWeekProgress,
      });
    };

    calculateLiveStats();
    const interval = setInterval(calculateLiveStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [videoProgress, userStats]);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className={`${darkMode ? 'apple-card-dark' : 'apple-card'} p-4 w-64 glass-effect`}>
        <div className="flex items-center mb-3">
          <div className="pulse-dot h-2 w-2 bg-green-500 rounded-full mr-2"></div>
          <span className="apple-text-caption font-medium">Live Stats</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">Today</span>
            </div>
            <span className="font-semibold">{liveStats.sessionsToday}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm">Avg Session</span>
            </div>
            <span className="font-semibold">{Math.round(liveStats.averageSessionLength / 60)}m</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">Completion</span>
            </div>
            <span className="font-semibold">{Math.round(liveStats.completionRate)}%</span>
          </div>
          
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Weekly Goal</span>
              </div>
              <span className="font-semibold">{Math.round(liveStats.weeklyGoalProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${liveStats.weeklyGoalProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStats;
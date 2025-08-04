import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'progress';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const RealTimeUpdates: React.FC = () => {
  const { userStats, videoProgress } = useAppStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastStats, setLastStats] = useState(userStats);

  // Monitor for achievements and milestones
  useEffect(() => {
    const checkForAchievements = () => {
      const newNotifications: Notification[] = [];

      // Check for completion milestones
      if (userStats.completedVideos > lastStats.completedVideos) {
        const completedCount = userStats.completedVideos;
        if (completedCount % 5 === 0) {
          newNotifications.push({
            id: crypto.randomUUID(),
            type: 'achievement',
            title: '🎉 Milestone Reached!',
            message: `You've completed ${completedCount} videos! Keep up the great work!`,
            timestamp: new Date(),
            read: false,
          });
        }
      }

      // Check for watch time milestones (every hour)
      const currentHours = Math.floor(userStats.totalWatchTime / 3600);
      const lastHours = Math.floor(lastStats.totalWatchTime / 3600);
      
      if (currentHours > lastHours) {
        newNotifications.push({
          id: crypto.randomUUID(),
          type: 'achievement',
          title: '⏰ Learning Time!',
          message: `You've watched ${currentHours} hours of educational content!`,
          timestamp: new Date(),
          read: false,
        });
      }

      // Check for streak achievements
      if (userStats.currentStreak > lastStats.currentStreak && userStats.currentStreak % 7 === 0) {
        newNotifications.push({
          id: crypto.randomUUID(),
          type: 'achievement',
          title: '🔥 Streak Master!',
          message: `${userStats.currentStreak} day learning streak! You're on fire!`,
          timestamp: new Date(),
          read: false,
        });
      }

      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev].slice(0, 10));
      }

      setLastStats(userStats);
    };

    checkForAchievements();
  }, [userStats, lastStats]);

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-20 right-6 w-96 max-h-96 apple-card z-40 overflow-hidden scale-in">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h3 className="apple-text-medium">Notifications</h3>
            <div className="flex items-center space-x-2">
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="apple-text-caption text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="apple-text-body">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 m-2 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="apple-text-body font-medium">{notification.title}</h4>
                      <p className="apple-text-caption text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="apple-text-caption text-gray-500 mt-2">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-3 w-3 bg-blue-500 rounded-full ml-3 mt-1 pulse-dot"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RealTimeUpdates;
import React from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  BarChart, 
  Calendar as CalendarIcon,
  Search,
  Flame
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import VideoSearchToggle from '../Video/VideoSearchToggle';
import RecentVideos from './RecentVideos';
import ProgressStats from './ProgressStats';
import UpcomingReminders from './UpcomingReminders';
import SearchVideos from '../Video/SearchVideos';

const Dashboard: React.FC = () => {
  const { userStats, isSearching } = useAppStore();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="apple-text-large">Your Learning Dashboard</h1>
        <VideoSearchToggle />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Watch Time"
          value={formatWatchTime(userStats.totalWatchTime)}
          icon={<Clock className="h-10 w-10 text-blue-500" />}
          color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800"
        />
        <StatsCard 
          title="Completed"
          value={`${userStats.completedVideos} videos`}
          icon={<CheckCircle className="h-10 w-10 text-green-500" />}
          color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800"
        />
        <StatsCard 
          title="Current Streak"
          value={`${userStats.currentStreak} days`}
          icon={<Flame className="h-10 w-10 text-orange-500" />}
          color="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800"
        />
        <StatsCard 
          title="Longest Streak"
          value={`${userStats.longestStreak} days`}
          icon={<BarChart className="h-10 w-10 text-purple-500" />}
          color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
        />
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search or Recent Videos */}
        <div className="lg:col-span-2">
          {isSearching ? (
            <div className="apple-card p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Search className="h-6 w-6 mr-3 text-black dark:text-white" />
                <h2 className="apple-text-medium">Find Videos</h2>
              </div>
              <SearchVideos />
            </div>
          ) : (
            <div className="apple-card p-8 hover-lift">
              <div className="flex items-center mb-6">
                <Play className="h-6 w-6 mr-3 text-black dark:text-white" />
                <h2 className="apple-text-medium">Recent Videos</h2>
              </div>
              <RecentVideos />
            </div>
          )}

          {/* Progress chart */}
          <div className="apple-card p-8 mt-8 hover-lift">
            <div className="flex items-center mb-6">
              <BarChart className="h-6 w-6 mr-3 text-black dark:text-white" />
              <h2 className="apple-text-medium">Learning Progress</h2>
            </div>
            <ProgressStats />
          </div>
        </div>

        {/* Calendar events */}
        <div className="apple-card p-8 hover-lift">
          <div className="flex items-center mb-6">
            <CalendarIcon className="h-6 w-6 mr-3 text-black dark:text-white" />
            <h2 className="apple-text-medium">Upcoming Reminders</h2>
          </div>
          <UpcomingReminders />
        </div>
      </div>
    </div>
  );
};

// Stats card component
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} rounded-3xl p-6 shadow-lg flex items-center hover-lift transition-all duration-300`}>
      <div className="rounded-2xl p-4 mr-4 bg-white dark:bg-gray-900 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="apple-text-caption font-medium opacity-70">{title}</p>
        <p className="apple-text-medium font-bold">{value}</p>
      </div>
    </div>
  );
};

// Helper function to format watch time in hours and minutes
const formatWatchTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds} sec`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}h ${remainingMinutes}m`;
};

export default Dashboard;
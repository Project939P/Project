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
        <h1 className="text-3xl font-bold tracking-tight">Your Learning Dashboard</h1>
        <VideoSearchToggle />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Watch Time"
          value={formatWatchTime(userStats.totalWatchTime)}
          icon={<Clock className="h-6 w-6" />}
          color="apple-card hover-lift"
        />
        <StatsCard 
          title="Completed"
          value={`${userStats.completedVideos} videos`}
          icon={<CheckCircle className="h-6 w-6" />}
          color="apple-card hover-lift"
        />
        <StatsCard 
          title="Current Streak"
          value={`${userStats.currentStreak} days`}
          icon={<Flame className="h-6 w-6" />}
          color="apple-card hover-lift"
        />
        <StatsCard 
          title="Longest Streak"
          value={`${userStats.longestStreak} days`}
          icon={<BarChart className="h-6 w-6" />}
          color="apple-card hover-lift"
        />
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search or Recent Videos */}
        <div className="lg:col-span-2">
          {isSearching ? (
            <div className="apple-card p-6 fade-in">
              <div className="flex items-center mb-4">
                <Search className="h-5 w-5 mr-3" />
                <h2 className="text-xl font-semibold tracking-tight">Find Videos</h2>
              </div>
              <SearchVideos />
            </div>
          ) : (
            <div className="apple-card p-6 fade-in">
              <div className="flex items-center mb-4">
                <Play className="h-5 w-5 mr-3" />
                <h2 className="text-xl font-semibold tracking-tight">Recent Videos</h2>
              </div>
              <RecentVideos />
            </div>
          )}

          {/* Progress chart */}
          <div className="apple-card p-6 mt-6 fade-in">
            <div className="flex items-center mb-4">
              <BarChart className="h-5 w-5 mr-3" />
              <h2 className="text-xl font-semibold tracking-tight">Learning Progress</h2>
            </div>
            <ProgressStats />
          </div>
        </div>

        {/* Calendar events */}
        <div className="apple-card p-6 fade-in">
          <div className="flex items-center mb-4">
            <CalendarIcon className="h-5 w-5 mr-3" />
            <h2 className="text-xl font-semibold tracking-tight">Upcoming Reminders</h2>
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
    <div className={`${color} p-6 flex items-center`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium opacity-70">{title}</p>
        <p className="text-xl font-bold">{value}</p>
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
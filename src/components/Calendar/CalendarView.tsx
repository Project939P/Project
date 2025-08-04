import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  Bell,
  X
} from 'lucide-react';
import { format, addDays, startOfWeek, startOfDay, addWeeks, isToday, isSameDay } from 'date-fns';
import toast from 'react-hot-toast';
import { useAppStore } from '../../store/useAppStore';

const CalendarView: React.FC = () => {
  const { videoProgress, playlists, darkMode } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  
  const weekDays = [...Array(7)].map((_, i) => {
    const date = addDays(startOfWeek(currentDate), i);
    return date;
  });
  
  const goToPreviousWeek = () => {
    setCurrentDate(prev => addWeeks(prev, -1));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  // This is a mock API for demonstration
  // In a real app, we would connect to Google Calendar API
  const mockEvents = [
    {
      id: '1',
      title: 'Complete React Hooks Tutorial',
      date: addDays(startOfDay(new Date()), 0),
      time: '10:00 AM',
      duration: 30,
    },
    {
      id: '2',
      title: 'Learn TypeScript Generics',
      date: addDays(startOfDay(new Date()), 1),
      time: '2:00 PM',
      duration: 45,
    },
    {
      id: '3',
      title: 'Advanced CSS Techniques',
      date: addDays(startOfDay(new Date()), 3),
      time: '4:00 PM',
      duration: 60,
    },
  ];
  
  const [reminderForm, setReminderForm] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    duration: '30',
  });
  
  const handleCreateReminder = () => {
    // In a real app, we would save to Google Calendar
    toast.success('Reminder created successfully!');
    setShowModal(false);
  };
  
  // Get events for the selected date
  const eventsForSelectedDate = selectedDate 
    ? mockEvents.filter(event => isSameDay(event.date, selectedDate))
    : [];
  
  // Get watched videos for the selected date
  const watchedVideosForDate = selectedDate 
    ? Object.values(videoProgress).filter(progress => 
        isSameDay(new Date(progress.lastWatched), selectedDate)
      ).map(progress => {
        // Find the video details from playlists
        for (const playlist of playlists) {
          const video = playlist.videos.find(v => v.id === progress.videoId);
          if (video) {
            return { ...video, progress };
          }
        }
        return null;
      }).filter(Boolean)
    : [];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="apple-text-large">Learning Schedule</h1>
        <button
          onClick={() => setShowModal(true)}
          className="apple-button-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Reminder
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="apple-card p-8 lg:col-span-2 hover-lift">
          {/* Calendar header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="apple-text-medium">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousWeek}
                className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToToday}
                className="apple-button-secondary"
              >
                Today
              </button>
              <button
                onClick={goToNextWeek}
                className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center apple-text-caption font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date) => {
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
              const currentDayClass = isToday(date) 
                ? 'bg-black dark:bg-white text-white dark:text-black font-semibold' 
                : '';
              const selectedClass = isSelected 
                ? 'bg-gray-200 dark:bg-gray-700 font-bold' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700';
              
              // Check if there are events for this date
              const hasEvents = mockEvents.some(event => isSameDay(event.date, date));
              const hasWatchedVideos = Object.values(videoProgress).some(progress => 
                isSameDay(new Date(progress.lastWatched), date)
              );
              
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateClick(date)}
                  className={`p-6 rounded-2xl text-center relative ${currentDayClass} ${selectedClass} transition-all duration-300 hover-lift`}
                >
                  <span className="apple-text-body font-medium">{format(date, 'd')}</span>
                  
                  {/* Dot indicator for events */}
                  {hasEvents && (
                    <span className="absolute bottom-3 left-1/2 transform -translate-x-1/2 h-2 w-2 bg-blue-500 rounded-full"></span>
                  )}
                  
                  {/* Dot indicator for watched videos */}
                  {hasWatchedVideos && (
                    <span className="absolute bottom-3 right-3 h-2 w-2 bg-green-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Events for selected date */}
        <div className="apple-card p-8 hover-lift">
          <div className="flex items-center mb-6">
            <CalendarIcon className="h-6 w-6 mr-3 text-black dark:text-white" />
            <h2 className="apple-text-medium">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'No date selected'}
            </h2>
          </div>
          
          {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {eventsForSelectedDate.map((event) => (
                <div 
                  key={event.id}
                  className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <h3 className="apple-text-body font-medium">{event.title}</h3>
                  <div className="flex items-center apple-text-caption mt-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {event.time} • {event.duration} minutes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Bell className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="apple-text-body text-gray-500 dark:text-gray-400 mb-2">No reminders for this day</p>
              <button
                onClick={() => setShowModal(true)}
                className="apple-button-secondary"
              >
                + Add Reminder
              </button>
            </div>
          )}
          
          {/* Watched videos section */}
          {watchedVideosForDate.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="apple-text-body font-medium mb-4">Videos Watched</h3>
              <div className="space-y-3">
                {watchedVideosForDate.map((video) => (
                  <div key={video.id} className="flex items-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800">
                    <img src={video.thumbnail} alt={video.title} className="w-16 h-12 rounded-xl object-cover mr-3 video-thumbnail" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{video.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{video.channelTitle}</p>
                      {video.progress.completed && <span className="text-xs text-green-500 font-medium">✓ Completed</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {eventsForSelectedDate.length === 0 && watchedVideosForDate.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="apple-text-body text-gray-500 dark:text-gray-400 mb-2">No activity for this day</p>
              <button
                onClick={() => setShowModal(true)}
                className="apple-button-secondary"
              >
                + Add Reminder
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="apple-card max-w-md w-full scale-in">
            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="apple-text-medium">Add Learning Reminder</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block apple-text-body font-medium mb-2">
                    Reminder Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={reminderForm.title}
                    onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                    className="apple-input"
                    placeholder="e.g., Complete React Tutorial"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block apple-text-body font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={reminderForm.date}
                    onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                    className="apple-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block apple-text-body font-medium mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                    className="apple-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block apple-text-body font-medium mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    id="duration"
                    value={reminderForm.duration}
                    onChange={(e) => setReminderForm({ ...reminderForm, duration: e.target.value })}
                    className="apple-input"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notification"
                    className="h-5 w-5 text-black border-gray-300 rounded-lg"
                  />
                  <label htmlFor="notification" className="ml-3 block apple-text-body">
                    Send notification 10 minutes before
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t dark:border-gray-700 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="apple-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReminder}
                className="apple-button-primary"
              >
                Create Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
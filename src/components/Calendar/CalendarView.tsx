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

const CalendarView: React.FC = () => {
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Learning Schedule</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Reminder
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 lg:col-span-2">
          {/* Calendar header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousWeek}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800"
              >
                Today
              </button>
              <button
                onClick={goToNextWeek}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 dark:text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((date) => {
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
              const currentDayClass = isToday(date) 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 font-semibold' 
                : '';
              const selectedClass = isSelected 
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 font-bold' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700';
              
              // Check if there are events for this date
              const hasEvents = mockEvents.some(event => isSameDay(event.date, date));
              
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateClick(date)}
                  className={`p-4 rounded-md text-center relative ${currentDayClass} ${selectedClass} transition-colors`}
                >
                  <span>{format(date, 'd')}</span>
                  
                  {/* Dot indicator for events */}
                  {hasEvents && (
                    <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Events for selected date */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" />
            <h2 className="text-lg font-medium">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'No date selected'}
            </h2>
          </div>
          
          {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {eventsForSelectedDate.map((event) => (
                <div 
                  key={event.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>
                      {event.time} • {event.duration} minutes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 mb-1">No reminders for this day</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
              >
                + Add Reminder
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-bold">Add Learning Reminder</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reminder Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={reminderForm.title}
                    onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                    className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    placeholder="e.g., Complete React Tutorial"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={reminderForm.date}
                    onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                    className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                    className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (minutes)
                  </label>
                  <select
                    id="duration"
                    value={reminderForm.duration}
                    onChange={(e) => setReminderForm({ ...reminderForm, duration: e.target.value })}
                    className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
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
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="notification" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Send notification 10 minutes before
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReminder}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
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
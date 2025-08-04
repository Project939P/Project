import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListVideo, 
  Play, 
  Calendar,
  BookOpen, 
  BarChart,
  Settings 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Sidebar: React.FC = () => {
  const { darkMode } = useAppStore();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div 
      className={`${darkMode ? 'bg-black/95 border-r border-gray-800' : 'bg-white/95 border-r border-gray-100'} ${
        collapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 ease-in-out hidden md:block backdrop-blur-2xl`}
    >
      <div className="py-6 px-3">
        <div className="flex flex-col h-full">
          <div className="space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <LayoutDashboard className="h-6 w-6 mr-3" />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
            
            <NavLink
              to="/playlists"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <ListVideo className="h-6 w-6 mr-3" />
              {!collapsed && <span>My Playlists</span>}
            </NavLink>
            
            <NavLink
              to="/player"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <Play className="h-6 w-6 mr-3" />
              {!collapsed && <span>Video Player</span>}
            </NavLink>
            
            <NavLink
              to="/calendar"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <Calendar className="h-6 w-6 mr-3" />
              {!collapsed && <span>Calendar</span>}
            </NavLink>
            
            <NavLink
              to="/learning"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <BookOpen className="h-6 w-6 mr-3" />
              {!collapsed && <span>Learning Path</span>}
            </NavLink>
            
            <NavLink
              to="/stats"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <BarChart className="h-6 w-6 mr-3" />
              {!collapsed && <span>Statistics</span>}
            </NavLink>
            
            <NavLink
              to="/settings"
              className={({ isActive }) => `
                flex items-center px-4 py-4 rounded-2xl apple-text-body font-medium transition-all duration-300 hover-lift
                ${collapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
                }
              `}
            >
              <Settings className="h-6 w-6 mr-3" />
              {!collapsed && <span>Settings</span>}
            </NavLink>
          </div>
        </div>
      </div>
      
      {/* Collapse button at the bottom */}
      <div className={`absolute bottom-6 ${collapsed ? 'left-4' : 'right-4'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-3 rounded-2xl ${
            darkMode ? 'bg-gray-900 hover:bg-gray-800 border border-gray-800' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
          } transition-colors`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
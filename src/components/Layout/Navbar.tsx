import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Youtube, 
  Menu, 
  X 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className={`${darkMode ? 'bg-black/90 border-b border-gray-800' : 'bg-white/90 border-b border-gray-100'} ${darkMode ? 'text-white' : 'text-black'} backdrop-blur-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
                <Youtube className="h-6 w-6 text-white dark:text-black" />
              </div>
              <span className="apple-text-large">LearnTrack</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/"
                className="px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link 
                to="/playlists"
                className="px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                My Playlists
              </Link>
              <Link 
                to="/player"
                className="px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Video Player
              </Link>
              <Link 
                to="/calendar"
                className="px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Calendar
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/playlists"
            className="block px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Playlists
          </Link>
          <Link
            to="/player"
            className="block px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Video Player
          </Link>
          <Link
            to="/calendar"
            className="block px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Calendar
          </Link>
          <button
            onClick={() => {
              toggleDarkMode();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center w-full px-6 py-3 rounded-full apple-text-body font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {darkMode ? (
              <>
                <Sun className="h-6 w-6 mr-3" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="h-6 w-6 mr-3" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
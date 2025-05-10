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
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-600'} text-white shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Youtube className="h-8 w-8" />
              <span className="font-semibold text-xl">LearnTrack</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/playlists"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
              >
                My Playlists
              </Link>
              <Link 
                to="/player"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
              >
                Video Player
              </Link>
              <Link 
                to="/calendar"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
              >
                Calendar
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
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
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/playlists"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Playlists
          </Link>
          <Link
            to="/player"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Video Player
          </Link>
          <Link
            to="/calendar"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Calendar
          </Link>
          <button
            onClick={() => {
              toggleDarkMode();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75 transition-colors"
          >
            {darkMode ? (
              <>
                <Sun className="h-5 w-5 mr-2" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 mr-2" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
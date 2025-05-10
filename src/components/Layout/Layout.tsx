import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from '../../store/useAppStore';

const Layout: React.FC = () => {
  const { darkMode } = useAppStore();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6 transition-all duration-200">
          <Outlet />
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`,
          duration: 5000,
        }}
      />
    </div>
  );
};

export default Layout;
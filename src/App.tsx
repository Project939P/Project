import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Playlists from './components/Playlists/Playlists';
import VideoPlayer from './components/Video/VideoPlayer';
import CalendarView from './components/Calendar/CalendarView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="player" element={<VideoPlayer />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
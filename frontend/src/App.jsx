import { Routes, Route } from 'react-router-dom';

import PlaylistsMainPage from './components/PlaylistsMainPage';
import PlaylistPage from './components/PlaylistPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaylistsMainPage />} />
      <Route path="/playlist/:id" element={<PlaylistPage />} />
    </Routes>
  );
}

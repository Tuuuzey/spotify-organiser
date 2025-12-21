import { useQuery } from '@tanstack/react-query';
import { fetchPlaylists } from '../api/spotify'
import PlaylistSection from './PlaylistSection';
import { useNavigate } from 'react-router-dom';

function PlaylistsMainPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
  });

  function goToPlaylist(id) {
    navigate(`/playlist/${id}`)
  }

  if (isLoading) {
    return (
      <div className="bg-purple-950 min-h-screen text-center text-lg text-white">
        Loading your library...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-purple-950 min-h-screen text-center text-lg text-white">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-purple-950 min-h-screen">
      {data.map((p) => (
        <div
          key={p.id}
          className="flex flex-col items-center justify-center h-[12rem] gap-16"
        >
          <PlaylistSection
            name={p.name}
            img={p.img}
            tracks_amount={p.tracks_amount}
            goToPlaylist={()=>goToPlaylist(p.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default PlaylistsMainPage;

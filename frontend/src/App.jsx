import { useQuery } from '@tanstack/react-query';
import { fetchPlaylists } from '../src/api/spotify';
import Playlist from './components/playlist';

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='bg-purple-950 min-h-screen'>
      {data.map(p => (
        <div key={p.id} className='flex flex-col items-center justify-center h-[12rem] gap-16'>
          <Playlist name={p.name} img={p.img} tracks_amount={p.tracks_amount}/>
        </div>
      ))}
    </div>
  );
}

export default App;

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { fetchPlaylistTracks } from '../api/spotify';
import TrackSection from './TrackSection';

export default function DisplayTracks() {
  const { id } = useParams();
  const [selectedGenre, setSelectedGenre] = useState('All');

  const { data, isLoading, error } = useQuery({
    queryKey: ['playlist-tracks', id],
    queryFn: () => fetchPlaylistTracks(id),
    enabled: !!id,
  });

  // always call hooks in same order
  const allTracks = data?.tracks || [];

  const genresList = useMemo(() => {
    const genresSet = new Set();
    allTracks.forEach((t) => {
      if (t.genres && t.genres.length > 0) {
        t.genres.forEach((g) => genresSet.add(g));
      } else {
        genresSet.add('Unknown');
      }
    });
    return ['All', ...Array.from(genresSet).sort()];
  }, [allTracks]);

  const filteredTracks = useMemo(() => {
    if (selectedGenre === 'All') return allTracks;
    return allTracks.filter((t) =>
      (t.genres && t.genres.length > 0
        ? t.genres.includes(selectedGenre)
        : selectedGenre === 'Unknown')
    );
  }, [allTracks, selectedGenre]);

  if (isLoading) {
    return (
      <div className="bg-purple-950 min-h-screen p-6 text-white">
        <p>Loading songs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-purple-950 min-h-screen p-6 text-white">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-purple-950 min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Number of tracks: {filteredTracks.length}
      </h1>

      {/* select genre */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Filter by genre:</label>
        <select
          className="bg-purple-800 text-white p-1 rounded"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genresList.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4">
        {filteredTracks.map((t, idx) => (
          <TrackSection
            key={`${t.track}-${idx}`}
            track={t.track}
            idx={idx}
            image_url={t.image_url}
            spotify_url={t.spotify_url}
            genres={t.genres}
          />
        ))}
      </div>
    </div>
  );
}

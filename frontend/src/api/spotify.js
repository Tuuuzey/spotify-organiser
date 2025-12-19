export async function fetchPlaylists() {
  const res = await fetch('http://127.0.0.1:8000/playlists', {
    credentials: 'include', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch playlists');
  }

  return res.json();
}

export async function fetchPlaylistTracks(playlistId) {
  const res = await fetch(`http://127.0.0.1:8000/playlist/${playlistId}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tracks');
  }

  return res.json();
}

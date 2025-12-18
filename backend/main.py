from typing import Union
from fastapi import FastAPI

from spotify_auth import sp


app = FastAPI()

@app.get('/playlists')
def read_pl():
  playlists = sp.current_user_playlists() 
  return playlists

@app.get('/playlist/')
def test():
  playlists = sp.current_user_playlists()
  playlist_id = playlists['items'][0]['id']
  all_tracks = []
  results = sp.playlist_items(playlist_id)

  while results:
    all_tracks.extend(results['items'])
    if results['next']:
      results = sp.next(results)
    else:
      results = None

  # making list (track_name, genres)
  track_genres = []

  for item in all_tracks:
    track = item['track']
    track_name = track['name']
    
    # getting first genre of author
    artist_id = track['artists'][0]['id']
    artist_info = sp.artist(artist_id)
    genres = artist_info['genres']
    
    track_genres.append((track_name, genres))

  return track_genres

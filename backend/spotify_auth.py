from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')

load_dotenv(dotenv_path)

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI')

scope = "playlist-modify-public playlist-modify-private playlist-read-private"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIFY_CLIENT_ID,
                                               client_secret=SPOTIFY_CLIENT_SECRET,
                                               redirect_uri=SPOTIFY_REDIRECT_URI,
                                               scope=scope))



# playlists = sp.current_user_playlists()
# for playlist in playlists['items']:
#     print("Playlist:", playlist['name'])

# playlist4 = playlists['items'][3]
# id_pl4 = playlist4['id']
# res = sp.playlist_items(id_pl4)
# print(res['items']['track'])
# # for idx, item in enumerate(res['items']):
# #   track = item['track']
# #   print(track)
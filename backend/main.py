from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from spotify_auth import sp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# return id name img tracks_amount of all playlists
@app.get("/playlists")
def get_playlist_data():
    res = []
    playlists = sp.current_user_playlists()['items']
    for playlist in playlists:
        data = {
            "id": playlist['id'],
            "name": playlist['name'],
            "img": playlist['images'][0]['url'],
            "tracks_amount": playlist['tracks']['total']
        }
        res.append(data)
    return res

# @app.get('/test')
# def test():
    # return sp.playlist_items('0oyi0zXNdoTVpLGeobrGjD')['items'][0]['track']['external_urls']['spotify'] LINK TO MUSIC
    # return sp.playlist_items('0oyi0zXNdoTVpLGeobrGjD')['items'][0]['track']['album']['images'][0]['url'] LINK TO IMAGE URL


# return tracks of given playlist
@app.get("/playlist/{playlist_id}")
def get_playlist_tracks(playlist_id: str):
    all_tracks = []
    results = sp.playlist_items(playlist_id)

    while results:
        all_tracks.extend(results['items'])
        results = sp.next(results) if results['next'] else None

    artist_ids = list({
        item['track']['artists'][0]['id']
        for item in all_tracks
        if item.get('track') and item['track'].get('artists')
    })

    artist_genres = {}
    for i in range(0, len(artist_ids), 50):
        batch = artist_ids[i:i + 50]
        artists = sp.artists(batch)['artists']
        for artist in artists:
            artist_genres[artist['id']] = artist['genres']

    res = []
    for item in all_tracks:
        track = item.get('track')
        if not track:
            continue

        artist_id = track['artists'][0]['id']

        res.append({
            "track": track['name'],
            "genres": artist_genres.get(artist_id, ["Unknown"]),
            "spotify_url": track['external_urls']['spotify'],
            "image_url": (
                track['album']['images'][0]['url']
                if track['album']['images']
                else None
            )
        })

    return {
        "playlist_id": playlist_id,
        "tracks_count": len(res),
        "tracks": res
    }

export default function TrackSection({ track, image_url, spotify_url, genres }) {
  return (
    <div
      className="flex items-center gap-4 p-2 bg-purple-800 rounded-md hover:bg-purple-700 transition"
    >
      {/* img */}
      <img
        src={image_url}
        alt={track}
        className="w-16 h-16 object-cover rounded-md"
      />

      {/* name and genre */}
      <div className="flex-1">
        <p className="font-semibold">{track}</p>
        <p className="text-sm text-gray-300">
          {genres && genres.length > 0 ? genres.join(', ') : 'Unknown'}
        </p>
      </div>

      {/* link to spotify song */}
      <a
        href={spotify_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 font-medium hover:underline"
      >
        Listen
      </a>
    </div>
  );
}

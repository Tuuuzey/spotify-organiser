export default function Playlist({ name, img, tracks_amount }) {
  return (
    <div className="w-[32rem] h-[150px] rounded-full bg-violet-600 p-4 flex items-center justify-between">
      <img src={img} className="w-[100px] h-[100px] object-cover rounded-full" />

      <div className="flex-1 mx-4 text-center">
        <p className="text-white text-lg font-semibold">{name}</p>
        <p className="text-white">Songs: {tracks_amount}</p>
      </div>

      <button className="bg-white text-violet-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-violet-50 transition">
        Go to
      </button>
    </div>
  )
}

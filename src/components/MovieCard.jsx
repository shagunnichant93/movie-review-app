
function MovieCard({ title, year, genre, rating, poster }) {

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

      {/* Movie Poster */}
      <img
        src={poster}
        alt={title}
        className="w-full h-80 object-cover"
      />

      {/* Movie Information */}
      <div className="p-4">

        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-2">
          {year} | {genre}
        </p>

        <p className="text-yellow-400 font-semibold">
          ⭐ {rating}/10
        </p>

      </div>

    </div>
  )
}

export default MovieCard

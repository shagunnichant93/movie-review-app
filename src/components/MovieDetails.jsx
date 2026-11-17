import StarRating from "./StarRating"
function MovieDetails({ movie, onClose, userRatings, setUserRatings })  {

  if (!movie) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">

      <div className="bg-gray-900 rounded-xl max-w-3xl w-full p-4 sm:p-6 relative my-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Movie Poster */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/300x450?text=No+Poster"
            }
            alt={movie.title}
            className="w-full max-w-[200px] md:w-64 mx-auto md:mx-0 rounded-lg object-cover"
          />

          {/* Movie Information */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              {movie.title}
            </h2>

            <p className="text-gray-400 mb-3">
              Release Date: {movie.release_date || "N/A"}
            </p>

            <p className="text-yellow-400 mb-4">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
            </p>
            <p className="text-green-400 mb-4">
                Your Rating: {userRatings[movie.id] || "Not rated"}/5
            </p>

            <h3 className="text-lg font-semibold mb-2">
              Overview
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {movie.overview || "No description available."}
            </p>
            <StarRating
                rating={userRatings[movie.id] || 0}
                setRating={(rating) =>
                setUserRatings((previousRatings) => ({
                ...previousRatings,
                [movie.id]: rating
                }))
                }
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieDetails

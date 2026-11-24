import MovieDetails from "./components/MovieDetails"
import { useState, useEffect, useRef } from "react"

import Navbar from "./components/Navbar"
import MovieCard from "./components/MovieCard"

import {
  getPopularMovies,
  getMovieGenres,
  searchMovies,
  getPopularMoviesPaginated,
  searchMoviesPaginated
} from "./services/tmdb"

function App() {
const [selectedMovie, setSelectedMovie] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
const [userRatings, setUserRatings] = useState(() => {
  const savedRatings = localStorage.getItem("movieRatings")

  return savedRatings ? JSON.parse(savedRatings) : {}
})
useEffect(() => {
  localStorage.setItem(
    "movieRatings",
    JSON.stringify(userRatings)
  )
}, [userRatings])
const calculateAverageRating = () => {
  const ratings = Object.values(userRatings)

  if (ratings.length === 0) {
    return 0
  }

  const total = ratings.reduce((sum, rating) => sum + rating, 0)

  return (total / ratings.length).toFixed(1)
}
  // TMDB Movies State
  const [tmdbMovies, setTmdbMovies] = useState([])

  // Movie Genres State
  const [genres, setGenres] = useState([])

  // Pagination states
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
  // Search State
  const [searchTerm, setSearchTerm] = useState("")

  const isFirstSearch = useRef(true)

  // Genre Filter State
  const [selectedGenre, setSelectedGenre] = useState("")

  // Year Filter State
  const [selectedYear, setSelectedYear] = useState("")

  // Rating Filter State
  const [selectedRating, setSelectedRating] = useState("")

  // Fetch Movies and Genres when App loads


const loadMovies = async (page = 1) => {
  try {
    setLoading(true)
    setError("")

    const data = await getPopularMoviesPaginated(page)

    setTmdbMovies(data.results)
    setCurrentPage(data.page)
    setTotalPages(data.total_pages)

  } catch (error) {
    console.error("Error loading movies:", error)
    setError("Unable to load movies. Please try again.")
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
  loadMovies()

  const loadGenres = async () => {
    try {
      const data = await getMovieGenres()
      setGenres(data)
    } catch (error) {
      console.error("Error loading genres:", error)
    }
  }

  loadGenres()

}, [])


useEffect(() => {
  // Skip the first render
  if (isFirstSearch.current) {
    isFirstSearch.current = false
    return
  }

  // If search is empty, load popular movies
  if (!searchTerm.trim()) {
    loadMovies(currentPage)
    return
  }

  // Wait 500ms after typing
  const timer = setTimeout(async () => {
    try {
      setLoading(true)
      setError("")

      const data = await searchMoviesPaginated(
        searchTerm.trim(),
        currentPage
      )

      setTmdbMovies(data.results)
      setCurrentPage(data.page)
      setTotalPages(data.total_pages)

    } catch (error) {
      console.error("Error searching movies:", error)
      setError("Unable to search movies. Please try again.")
    } finally {
      setLoading(false)
    }
  }, 500)

  return () => clearTimeout(timer)

}, [searchTerm, currentPage])

// Get available years from currently loaded movies
const availableYears = [
  ...new Set(
    tmdbMovies
      .map((movie) => movie.release_date?.substring(0, 4))
      .filter(Boolean)
  )
].sort((a, b) => Number(b) - Number(a))
// Apply Genre, Year and Rating Filters
const filteredMovies = tmdbMovies.filter((movie) => {

  const matchesGenre =
    selectedGenre === "" ||
    (movie.genre_ids || []).includes(Number(selectedGenre))

  const movieYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : ""

  const matchesYear =
    selectedYear === "" || movieYear === selectedYear

  const matchesRating =
    selectedRating === "" ||
    movie.vote_average >= Number(selectedRating)

  return matchesGenre && matchesYear && matchesRating
})
  return (

    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-12">

        <h1 className="text-4xl font-bold mb-4">
          Discover Your Favourite Movies
        </h1>

        <p className="text-gray-400 mb-8">
          Search, explore and review movies
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => {
  setSearchTerm(e.target.value)
  setCurrentPage(1)
}}
          className="w-full sm:w-80 max-w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-6 px-4">

          {/* Genre Filter */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full sm:w-auto p-3 rounded-lg bg-gray-800 text-white"
          >
            <option value="">All Genres</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}

          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full sm:w-auto p-3 rounded-lg bg-gray-800 text-white"
          >
            <option value="">All Years</option>

            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}

          </select>

          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="w-full sm:w-auto p-3 rounded-lg bg-gray-800 text-white"
          >
            <option value="">All Ratings</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="8.5">8.5+</option>
            <option value="9">9+</option>
          </select>

        </div>

      </div>

      {/* Movie Listing Section */}
      <div className="px-8 pb-12">

        <h2 className="text-2xl font-bold mb-6">
  {searchTerm.trim() ? "Search Results" : "Popular Movies"}
</h2>
        {loading && (
  <p className="text-center text-yellow-400 text-lg">
    Loading movies...
  </p>
)}

{error && (
  <div className="text-center mt-4">

    <p className="text-red-400 mb-3">
      {error}
    </p>

    <button
      onClick={loadMovies}
      className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
    >
      Retry
    </button>

  </div>
)}


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredMovies.length > 0 ? (

            filteredMovies.map((movie) => {

              // Convert genre IDs into genre names
              const movieGenres = (movie.genre_ids || [])
                .map((id) => genres.find((genre) => genre.id === id)?.name)
                .filter(Boolean)
                .join(", ")

              return (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  year={
                    movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "N/A"
                  }
                  genre={movieGenres || "Genre unavailable"}
                  rating={
                    typeof movie.vote_average === "number"
                      ? movie.vote_average.toFixed(1)
                      : "N/A"
                  }
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/300x450?text=No+Poster"
                  }
                  onClick={() => setSelectedMovie(movie)}
                />
              )
            })

          ) : (

            <p className="text-gray-400">
              No movies found.
            </p>

          )}

        </div>

{/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-10">

    <button
      onClick={() => setCurrentPage((prev) => prev - 1)}
      disabled={currentPage === 1}
      className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    <span className="text-white">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((prev) => prev + 1)}
      disabled={currentPage === totalPages}
      className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Next
    </button>

  </div>
)}


      </div>
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            userRatings={userRatings}
            setUserRatings={setUserRatings}
          />
    </div>
  )
}

export default App

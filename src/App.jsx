
import { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import MovieCard from "./components/MovieCard"

import {
  getPopularMovies,
  getMovieGenres
} from "./services/tmdb"

function App() {

  // TMDB Movies State
  const [tmdbMovies, setTmdbMovies] = useState([])

  // Movie Genres State
  const [genres, setGenres] = useState([])

  // Search State
  const [searchTerm, setSearchTerm] = useState("")

  // Genre Filter State
  const [selectedGenre, setSelectedGenre] = useState("")

  // Year Filter State
  const [selectedYear, setSelectedYear] = useState("")

  // Rating Filter State
  const [selectedRating, setSelectedRating] = useState("")

  // Fetch Movies and Genres when App loads
  useEffect(() => {

    const loadMovies = async () => {
      try {
        const data = await getPopularMovies()
        setTmdbMovies(data)
      } catch (error) {
        console.error("Error loading movies:", error)
      }
    }

    const loadGenres = async () => {
      try {
        const data = await getMovieGenres()
        setGenres(data)
      } catch (error) {
        console.error("Error loading genres:", error)
      }
    }

    loadMovies()
    loadGenres()

  }, [])

  // Get available years from TMDB movies
  const availableYears = [
    ...new Set(
      tmdbMovies
        .map((movie) => movie.release_date?.substring(0, 4))
        .filter(Boolean)
    )
  ].sort((a, b) => Number(b) - Number(a))

  // Filter Movies
  const filteredMovies = tmdbMovies.filter((movie) => {

    // Search Filter
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    // Genre Filter
    const matchesGenre =
      selectedGenre === "" ||
      (movie.genre_ids || []).includes(Number(selectedGenre))

    // Year Filter
    const movieYear = movie.release_date
      ? movie.release_date.substring(0, 4)
      : ""

    const matchesYear =
      selectedYear === "" || movieYear === selectedYear

    // Rating Filter
    const matchesRating =
      selectedRating === "" ||
      movie.vote_average >= Number(selectedRating)

    return (
      matchesSearch &&
      matchesGenre &&
      matchesYear &&
      matchesRating
    )
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
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 max-w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">

          {/* Genre Filter */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white"
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
            className="p-3 rounded-lg bg-gray-800 text-white"
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
            className="p-3 rounded-lg bg-gray-800 text-white"
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
          Popular Movies
        </h2>

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
                />
              )
            })

          ) : (

            <p className="text-gray-400">
              No movies found.
            </p>

          )}

        </div>

      </div>

    </div>
  )
}

export default App

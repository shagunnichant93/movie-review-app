
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }

  const data = await response.json()

  return data.results
}

export async function getMovieGenres() {

  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movie genres")
  }

  const data = await response.json()

  return data.genres
}

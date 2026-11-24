
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

// 1. Get Popular Movies
export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data.results;
}

// 2. Search Movies using TMDB API
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();

  return data.results;
}

// 3. Get Movie Genres
export async function getMovieGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie genres");
  }

  const data = await response.json();

  return data.genres;
}

// Get Popular Movies with Pagination
export async function getPopularMoviesPaginated(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return await response.json();
}

// Search Movies with Pagination
export async function searchMoviesPaginated(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return await response.json();
}

# 🎬 MovieZone – Movie Review Application

MovieZone is a responsive movie discovery and review application built using React.js and Tailwind CSS. It allows users to explore popular movies, search by title, filter movies by genre, release year and rating, view movie details, and submit personal star ratings.

Movie data is fetched from **The Movie Database (TMDB) API**.

## ✨ Features

- **Popular Movies:** Browse popular movies fetched from TMDB.
- **Movie Search:** Search movies by title.
- **Genre Filter:** Filter movies based on their genres.
- **Year Filter:** Filter movies by release year.
- **Rating Filter:** Filter movies based on TMDB ratings.
- **Combined Filters:** Apply search and multiple filters together.
- **Movie Details:** View movie posters, release dates, ratings and descriptions.
- **Personal Star Ratings:** Rate movies from 1 to 5 stars.
- **LocalStorage:** Save personal ratings in the browser so they remain available after refreshing.
- **Loading and Error Handling:** Display loading messages and retry options when movie data cannot be fetched.
- **Responsive Design:** Supports mobile, tablet and desktop screens.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS | Responsive styling |
| React Hooks | State and lifecycle management |
| TMDB API | Movie data |
| LocalStorage | Persist user ratings |
| Vite | Development server and build tool |
| Git & GitHub | Version control |

## 📁 Project Structure

```text
movie-review-app/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetails.jsx
│   │   └── StarRating.jsx
│   │
│   ├── services/
│   │   └── tmdb.js
│   │
│   ├── data/
│   │   └── movies.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/shagunnichant93/movie-review-app
```

### 2. Navigate to the project directory

```bash
cd movie-review-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure TMDB API

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your own TMDB API key.

You can obtain an API key from:

https://www.themoviedb.org/settings/api

**Important:** Never commit your actual `.env` file to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🎯 Application Workflow

1. The application loads popular movies from the TMDB API.
2. Movie information is displayed using reusable React components.
3. Users can search and filter movies.
4. Clicking a movie opens its details.
5. Users can submit a personal rating using the star rating component.
6. Ratings are stored in browser LocalStorage.
7. Saved ratings remain available after refreshing the page.

## 💾 Personal Rating Storage

MovieZone uses browser LocalStorage to persist user ratings.

Example:

```javascript
localStorage.setItem(
  "movieRatings",
  JSON.stringify(userRatings)
)
```

Each movie is identified by its TMDB movie ID, allowing separate ratings for different movies.

## 📱 Responsive Design

The application uses Tailwind CSS responsive utilities to adapt the interface to different screen sizes.

- Mobile: Single-column movie layout.
- Tablet: Two or three-column movie layout.
- Desktop: Four-column movie layout.

## 🚀 Future Improvements

- Fetch movies by selected year using TMDB Discover API.
- Add movie cast and crew information.
- Display average user ratings.
- Add pagination and infinite scrolling.
- Add user authentication.
- Introduce a backend to store ratings permanently.
- Deploy the application using Netlify.

## 🙏 Acknowledgements

Movie data and movie images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

---

**Developed as a React.js learning project.**
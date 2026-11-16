import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-4">

        <h1 className="text-4xl font-bold mb-4">
          Discover Your Next Favourite Movie
        </h1>

        <p className="text-gray-400 mb-8">
          Explore movies, read reviews and share your ratings.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">

          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-red-500"
          />

        </div>

      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-8 mb-10">

        <div className="flex flex-wrap gap-4">

          <select className="bg-gray-800 px-4 py-3 rounded-lg">
            <option>All Genres</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
          </select>

          <select className="bg-gray-800 px-4 py-3 rounded-lg">
            <option>All Years</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>

        </div>

      </section>

      {/* Movie Listing Section */}
      <section className="max-w-7xl mx-auto px-8">

        <h2 className="text-2xl font-bold mb-6">
          Popular Movies
        </h2>

        <p className="text-gray-400">
          Movie listings will appear here.
        </p>

      </section>

    </div>
  )
}

export default App
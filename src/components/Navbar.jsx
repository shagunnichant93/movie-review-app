function Navbar() {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-8 py-5 border-b border-gray-800">

      {/* Application Logo */}
      <h1 className="text-2xl font-bold text-red-500">
        MovieZone
      </h1>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-gray-300">

        <a href="#" className="hover:text-white">
          Home
        </a>

        <a href="#" className="hover:text-white">
          Movies
        </a>

        <a href="#" className="hover:text-white">
          My Reviews
        </a>

      </div>

    </nav>
  )
}

export default Navbar
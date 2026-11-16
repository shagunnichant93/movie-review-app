function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">

      {/* Application Logo */}
      <h1 className="text-2xl font-bold text-red-500">
        MovieZone
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-6 text-gray-300">

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
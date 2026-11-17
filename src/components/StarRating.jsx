
import { useState } from "react"


function StarRating({ rating, setRating }) {

  return (
    <div className="mt-6">

      <h3 className="text-lg font-semibold mb-3">
        Rate This Movie
      </h3>

      <div className="flex gap-2">

        {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-500"
            }`}
          >
            ★
          </button>

        ))}

      </div>

      <p className="text-gray-400 mt-2">
        Your Rating: {rating}/5
      </p>

    </div>
  )
}

export default StarRating

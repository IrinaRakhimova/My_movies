import { useState } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

function Movies({ movies, setMovies, searchQuery, setSearchQuery }) {

    const [message, setMessage] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    
    const handleDelete = (id) => {
      setMovies(movies.filter(movie => movie.id !== id));
    };

    const handleToggleLike = (id) => {
      const updatedMovies = movies.map(movie => 
          movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      );
      setMovies(updatedMovies);
  };

    const filteredMovies = movies.filter(movie => 
      (movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.about.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!showFavorites || movie.isLiked)
    );
    
    return (
    <main className="container">
        <div className="row justify-content-center mt-3 mb-3">
            <Navbar setSearchQuery={setSearchQuery} setMessage={setMessage} showFavorites={showFavorites} setShowFavorites={setShowFavorites}/>
            <div style={{ height: "24px" }} className="text-end">
                    {searchQuery && <p>{message}</p>}
                </div>
            {filteredMovies.map((movie) => (
                <div className="col-md-4 d-flex justify-content-center mb-4" key={movie.id}>
                  <MovieCard movie={movie} onDelete={handleDelete} onToggleLike={handleToggleLike} />
                </div>
            ))}
        </div>
    </main>
  );
}

export default Movies;

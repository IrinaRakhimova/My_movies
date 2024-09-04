import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

const ITEMS_PER_PAGE = 9;

function Movies({ movies, setMovies, searchQuery, setSearchQuery }) {

    const [message, setMessage] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ratingFilter, setRatingFilter] = useState("all");

    useEffect(() => {
      const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
      setMovies(savedMovies);
    }, []);

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [movies]);
    
    const handleDelete = (id) => {
      setMovies(movies.filter(movie => movie.id !== id));
    };

    const handleToggleLike = (id) => {
      const updatedMovies = movies.map(movie => 
          movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      );
      setMovies(updatedMovies);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
        movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.about.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFavorites = !showFavorites || movie.isLiked;

    const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "80-100" && movie.rating >= 80) ||
        (ratingFilter === "60-80" && movie.rating >= 60 && movie.rating < 80) ||
        (ratingFilter === "40-60" && movie.rating >= 40 && movie.rating < 60) ||
        (ratingFilter === "0-40" && movie.rating < 40);

    return matchesSearch && matchesFavorites && matchesRating;
});

    const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    return (
    <main className="container">
        <div className="row justify-content-center mt-3 mb-3">
            <Navbar setSearchQuery={setSearchQuery} setMessage={setMessage} showFavorites={showFavorites} setShowFavorites={setShowFavorites} setCurrentPage={setCurrentPage} setRatingFilter={setRatingFilter}/>
            <div style={{ height: "24px" }} className="text-center">
                    {searchQuery && <p>{message}</p>}
                </div>
            {currentMovies.map((movie) => (
                <div className="col-md-4 d-flex justify-content-center mb-4" key={movie.id}>
                  <MovieCard movie={movie} onDelete={handleDelete} onToggleLike={handleToggleLike} />
                </div>
            ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                            <li 
                                key={page} 
                                className={`page-item ${currentPage === page ? 'active' : ''}`}
                            >
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
    </main>
  );
}

export default Movies;

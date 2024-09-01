import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

function Movies({ movies, setMovies }) {
  
    const handleDelete = (id) => {
      setMovies(movies.filter(movie => movie.id !== id));
    };
    
    return (
    <main className="container">
        <div className="row justify-content-center mt-3 mb-3">
            <Navbar />
            {movies.map((movie) => (
                <div className="col-md-4 d-flex justify-content-center mb-4" key={movie.id}>
                <MovieCard movie={movie} onDelete={handleDelete} />
                </div>
            ))}
        </div>
    </main>
  );
}

export default Movies;

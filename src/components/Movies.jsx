import { useState } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

function Movies({ movies, setMovies, searchQuery, setSearchQuery }) {

    const [message, setMessage] = useState("");
    
    const handleDelete = (id) => {
      setMovies(movies.filter(movie => movie.id !== id));
    };

    const filteredMovies = movies.filter(movie => 
      movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.about.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
    return (
    <main className="container">
        <div className="row justify-content-center mt-3 mb-3">
            <Navbar setSearchQuery={setSearchQuery} setMessage={setMessage}/>
            <div style={{ height: "24px" }} className="text-end">
                    {searchQuery && <p>{message}</p>}
                </div>
            {filteredMovies.map((movie) => (
                <div className="col-md-4 d-flex justify-content-center mb-4" key={movie.id}>
                <MovieCard movie={movie} onDelete={handleDelete} />
                </div>
            ))}
        </div>
    </main>
  );
}

export default Movies;

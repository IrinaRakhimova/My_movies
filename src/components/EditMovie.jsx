import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditMovie({ movies, setMovies }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [movieName, setMovieName] = useState("");
    const [movieAbout, setMovieAbout] = useState("");
    const [movieFile, setMovieFile] = useState(null);

    useEffect(() => {
        const currentMovie = movies.find(movie => movie.id === parseInt(id));
        if (currentMovie) {
            setMovie(currentMovie);
            setMovieName(currentMovie.name);
            setMovieAbout(currentMovie.about);
            setMovieFile(currentMovie.image);
        } else {
            navigate('/products');
        }
    }, [id, movies, navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMovieFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = {
            ...movie,
            name: movieName,
            about: movieAbout,
            image: movieFile || movie.image,
        };

        const updatedMovies = movies.map(m => m.id === movie.id ? updatedMovie : m);
        setMovies(updatedMovies);
        navigate(`/products/${movie.id}`);
    };

    return (
        <div>
            <h1>Edit Movie</h1>
            {movie && (
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label for="Name" className="col-sm-2 col-form-label">Movie Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="About" className="col-sm-2 col-form-label">About</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="About" value={movieAbout} onChange={(e) => setMovieAbout(e.target.value)} required></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="formFile" className="col-sm-2 col-form-label">Change Picture</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            )}
        </div>
    );
}

export default EditMovie;
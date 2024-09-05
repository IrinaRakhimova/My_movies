import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import arrow from "../arrow.svg";

function EditMovie({ movies, setMovies }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [movieName, setMovieName] = useState("");
    const [movieAbout, setMovieAbout] = useState("");
    const [movieFile, setMovieFile] = useState(null);
    const [movieRating, setMovieRating] = useState(50);

    useEffect(() => {
        const currentMovie = movies.find(movie => movie.id === parseInt(id));
        if (currentMovie) {
            setMovie(currentMovie);
            setMovieName(currentMovie.name);
            setMovieAbout(currentMovie.about);
            setMovieFile(currentMovie.image);
            setMovieRating(currentMovie.rating)
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
            rating: movieRating,
        };

        const updatedMovies = movies.map(m => m.id === movie.id ? updatedMovie : m);
        setMovies(updatedMovies);
        navigate(`/products/${movie.id}`);
    };

    const handleClick = () => {
        navigate('/products');
    };

    return (
        <div className="container">            
            <button className="btn btn-secondary mx-5 mt-2" onClick={handleClick} style={{backgroundColor: "white", border: "none", color: "#0d6efd"}}><img src={arrow}/> Главная страница</button>           
            <h1 className="text-center mt-4">Редактировать</h1>
            {movie && (
                <form onSubmit={handleSubmit} className="mx-5 px-3 mt-4 d-flex" style={{height: "300px"}}>
                    <img src={movieFile}/>
                    <div className='w-100 ms-5'>
                        <div className="row mb-3">
                            <label for="Name" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="About" className="col-sm-2 col-form-label">Описание</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="About" value={movieAbout} onChange={(e) => setMovieAbout(e.target.value)} required></textarea>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="formFile" className="col-sm-2 col-form-label">Поменять постер</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="customRange1" class="col-sm-2 col-form-label">Оценка</label>
                            <div className="col-sm-10 d-flex align-items-center">
                                <input type="range" class="form-range" id="customRange1" min="0" max="100"  value={movieRating} onChange={(e) => setMovieRating(e.target.value)} />
                                <output className="col-sm-2 text-end" style={{ paddingLeft: "10px", width: "50px" }}>{movieRating}%</output>
                            </div>                        
                        </div>
                        <div className="d-flex justify-content-center flex-column align-items-end">
                            <button type="submit" className="btn btn-primary w-25 mt-3">Сохранить</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default EditMovie;
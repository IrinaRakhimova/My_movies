import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import arrow from "../images/arrow.svg";
import { Movie } from "../types";

interface EditMovieProps {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const EditMovie: React.FC<EditMovieProps> = ({ movies, setMovies }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [movieName, setMovieName] = useState<string>("");
    const [movieAbout, setMovieAbout] = useState<string>("");
    const [movieFile, setMovieFile] = useState<string | ArrayBuffer | null>(null);
    const [movieRating, setMovieRating] = useState<number>(50);

    useEffect(() => {
        const currentMovie = movies.find(movie => movie.id === parseInt(id!));
        if (currentMovie) {
            setMovie(currentMovie);
            setMovieName(currentMovie.name);
            setMovieAbout(currentMovie.about);
            setMovieFile(currentMovie.image);
            setMovieRating(currentMovie.rating);
        } else {
            navigate('/products');
        }
    }, [id, movies, navigate]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMovieFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!movie) return;

        const updatedMovie: Movie = {
            ...movie,
            name: movieName,
            about: movieAbout,
            image: (movieFile as string) || movie.image,
            rating: movieRating,
        };

        const updatedMovies = movies.map(m => m.id === movie.id ? updatedMovie : m);
        setMovies(updatedMovies);
        localStorage.setItem("movies", JSON.stringify(updatedMovies));
        navigate(`/products/${movie.id}`);
    };

    const handleClick = () => {
        navigate('/products');
    };

    return (
        <div className="container">            
            <button className="btn btn-secondary mx-5 mt-2" onClick={handleClick} style={{ backgroundColor: "white", border: "none", color: "#0d6efd" }}>
                <img src={arrow} alt="arrow"/> Главная страница
            </button>           
            <h1 className="text-center mt-4">Редактировать</h1>
            {movie && (
                <form onSubmit={handleSubmit} className="mx-5 px-3 mt-4 d-flex form" style={{ height: "300px" }}>
                    <div className='image-container'>
                        <img src={movieFile as string} className='image' alt="movie poster" />
                    </div>
                    <div className='w-100 ms-5'>
                        <div className="row mb-3">
                            <label htmlFor="Name" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} maxLength={500} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="About" className="col-sm-2 col-form-label">Описание</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="About" value={movieAbout} onChange={(e) => setMovieAbout(e.target.value)} maxLength={5000} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="formFile" className="col-sm-2 col-form-label">Поменять постер</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="file" accept="image/*" id="formFile" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="customRange1" className="col-sm-2 col-form-label">Оценка</label>
                            <div className="col-sm-10 d-flex align-items-center">
                                <input type="range" className="form-range" id="customRange1" min="0" max="100" value={movieRating} onChange={(e) => setMovieRating(Number(e.target.value))} />
                                <output className="col-sm-2 text-end" style={{ paddingLeft: "10px", width: "50px" }}>{movieRating}%</output>
                            </div>                        
                        </div>
                        <div className="d-flex justify-content-center flex-column align-items-end">
                            <button type="submit" className="btn btn-primary mt-3" style={{ width: "140px" }}>Сохранить</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditMovie;
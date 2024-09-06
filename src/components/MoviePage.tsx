import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholder from "../film_placeholder.png";
import arrow from "../arrow.svg";

// Define types for the props and movie object
interface Movie {
    id: number;
    name: string;
    about: string;
    image?: string;
    rating: number;
}

interface MoviePageProps {
    movies: Movie[];
}

const MoviePage: React.FC<MoviePageProps> = ({ movies }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const movie = movies.find(movie => movie.id === parseInt(id || '')) || {
        name: 'Movie not found',
        about: '',
        image: '',
        rating: 0
    };

    const handleClick = () => {
        navigate('/products');
    };

    return (
        <div className="container">
            <button
                className="btn btn-secondary mt-2"
                onClick={handleClick}
                style={{ backgroundColor: "white", border: "none", color: "#0d6efd" }}
            >
                <img src={arrow} alt="Back" /> Главная страница
            </button>
            <h1 className="my-2 mt-2 text-center">{movie.name}</h1>
            <div className='d-flex mt-3'>
                <img
                    src={movie.image || placeholder}
                    alt={movie.name}
                    style={{ height: "30rem" }}
                />
                <div className='mx-5'>
                    <p>{movie.about}</p>
                    <p className="fw-bolder">Rating: {movie.rating}%</p>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;
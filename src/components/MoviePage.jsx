import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholder from "../film_placeholder.png";
import arrow from "../arrow.svg";

function MoviePage({ movies }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const movie = movies.find(movie => movie.id === parseInt(id));

    const handleClick = () => {
        navigate('/products');
    };

    return (
        <div className="container">
            <button className="btn btn-secondary mt-2" onClick={handleClick} style={{backgroundColor: "white", border: "none", color: "#0d6efd"}}><img src={arrow}/> Главная страница</button>
            <h1 className="my-2 mt-2 text-center">{movie.name}</h1>
            <div className='d-flex mt-3'>
                <img src={movie.image || placeholder} alt={movie.name} style={{ height: "30rem"}}/>
                <div className='mx-5'>
                    <p>{movie.about}</p>
                    <p className="fw-bolder">Rating: {movie.rating}%</p>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
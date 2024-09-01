import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholder from "../film_placeholder.png";

function MoviePage({ movies }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const movie = movies.find(movie => movie.id === parseInt(id));

    return (
        <div className="container">
            <h1 className="my-2">{movie.name}</h1>
            <img src={placeholder} alt={movie.name} />
            <p>{movie.about}</p>
        </div>
    );
}

export default MoviePage;
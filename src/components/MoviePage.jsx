import React from 'react';
import { useParams } from 'react-router-dom';
import placeholder from "../film_placeholder.png";

function MoviePage({ movies }) {
    const { id } = useParams();
    const movie = movies.find(movie => movie.id === parseInt(id));

    return (
        <div className="container">
            <h1>{movie.name}</h1>
            <img src={placeholder} alt={movie.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        </div>
    );
}

export default MoviePage;
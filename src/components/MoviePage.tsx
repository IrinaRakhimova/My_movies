import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholder from "../images/film_placeholder.png";
import arrow from "../images/arrow.svg";
import { Movie } from "../types";

interface MoviePageProps {
  movies: Movie[];
}

const MoviePage: React.FC<MoviePageProps> = ({ movies }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movie = movies.find((movie) => movie.id === parseInt(id || "")) || {
    title: "Movie not found",
    overview: "",
    poster_path: "",
    rating: 0,
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <button
        className="btn btn-secondary mt-2"
        onClick={handleClick}
        style={{ backgroundColor: "white", border: "none", color: "#0d6efd" }}
      >
        <img src={arrow} alt="Back" /> Main page
      </button>
      <h1 className="my-2 mt-2 text-center">{movie.title}</h1>
      <div className="d-flex mt-3">
        <img
          src={movie.poster_path || placeholder}
          alt={movie.title}
          style={{ height: "30rem", maxWidth: "30rem" }}
        />
        <div className="mx-5">
          <p>{movie.overview}</p>
          <p className="fw-bolder">Rating: {movie.rating}%</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

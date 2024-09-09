import React, { useState } from "react";
import placeholder from "../images/film_placeholder.png";
import { useNavigate } from "react-router-dom";
import AddMovie from "./AddMovie";
import arrow from "../images/arrow.svg";
import { Movie } from "../types";

interface CreateProps {
  addMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
  isInMovies: (id: number) => boolean;
}

const Create: React.FC<CreateProps> = ({ addMovie, removeMovie, isInMovies }) => {
  const [movieName, setMovieName] = useState<string>("");
  const [movieAbout, setMovieAbout] = useState<string>("");
  const [movieFile, setMovieFile] = useState<string | ArrayBuffer | null>(null);
  const [movieRating, setMovieRating] = useState<number>(50);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieRating(parseInt(e.target.value, 10));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMovieFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMovieFile(placeholder);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie: Movie = {
      id: Date.now(),
      name: movieName,
      about: movieAbout,
      image: movieFile || placeholder,
      rating: movieRating,
      isLiked: false,
    };

    addMovie(newMovie);
    setMovieName("");
    setMovieAbout("");
    setMovieFile(null);
    setMovieRating(50); 
    setMessage(`Добавлен фильм: ${movieName}`);
  };

  const handleClick = () => {
    navigate('/products');
  };

  return (
    <div className="container">
      <button
        className="btn btn-secondary mx-5 mt-2"
        onClick={handleClick}
        style={{ backgroundColor: "white", border: "none", color: "#0d6efd" }}
      >
        <img src={arrow} alt="arrow" /> Главная страница
      </button>
      <h1 className="text-center mt-4">Добавить свой фильм</h1>
      <form onSubmit={handleSubmit} className="mx-5 px-3 mt-4">
        <div className="row mb-3 field">
          <label htmlFor="Name" className="col-sm-2 col-form-label" style={{ width: "92px" }}>
            Название
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="Name"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              maxLength={500} 
              required
            />
          </div>
        </div>
        <div className="row mb-3 field">
          <label htmlFor="About" className="col-sm-2 col-form-label" style={{ width: "92px" }}>
            Описание
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="About"
              value={movieAbout}
              onChange={(e) => setMovieAbout(e.target.value)}
              maxLength={5000} 
              required
            />
          </div>
        </div>
        <div className="row mb-3 field">
          <label htmlFor="formFile" className="col-sm-2 col-form-label" style={{ width: "92px" }}>
            Постер
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="row mb-3 field">
          <label htmlFor="customRange1" className="col-sm-2 col-form-label" style={{ width: "92px" }}>
            Оценка
          </label>
          <div className="col-sm-10 d-flex align-items-center">
            <input
              type="range"
              className="form-range"
              id="customRange1"
              min="0"
              max="100"
              value={movieRating}
              onChange={handleRangeChange}
            />
            <output className="col-sm-2 text-end" style={{ paddingLeft: "10px", width: "50px" }}>
              {movieRating}%
            </output>
          </div>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-end me-5" id="add-button-container">
          <button type="submit" className="btn btn-primary w-25" id="add-button" style={{ minWidth: "100px", marginRight: "58px" }}>
            Добавить
          </button>
          <p className="mt-4 fw-bold text-success" id="add-message" style={{marginRight: "50px"}}>{message}</p>
        </div>
      </form>
      <div className="mx-5 px-3">
        <AddMovie addMovie={addMovie} removeMovie={removeMovie} isInMovies={isInMovies} />
      </div>
    </div>
  );
};

export default Create;

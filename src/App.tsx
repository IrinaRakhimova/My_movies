import React, { useState, useEffect } from "react";
import "./App.css";
import Movies from "./components/Movies";
import MoviePage from "./components/MoviePage";
import Create from "./components/Create";
import EditMovie from "./components/EditMovie";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Movie } from "./types";


const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  const addMovie = (newMovie: Movie): void => {
    const moviesCombined = [newMovie, ...movies];
    setMovies(moviesCombined);
    localStorage.setItem("movies", JSON.stringify(moviesCombined));
  };

  const removeMovie = (id: number): void => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const isInMovies = (id: number): boolean => {
    return movies.some((movie) => movie.id === id);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Movies
            movies={movies}
            setMovies={setMovies}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
      />
      <Route path="/:id" element={<MoviePage movies={movies} />} />
      <Route
        path="/create"
        element={
          <Create
            addMovie={addMovie}
            removeMovie={removeMovie}
            isInMovies={isInMovies}
          />
        }
      />
      <Route
        path="/edit/:id"
        element={<EditMovie movies={movies} setMovies={setMovies} />}
      />
    </Routes>
  );
};

export default App;

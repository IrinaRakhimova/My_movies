import React, { useState, useEffect } from "react";
import "./App.css";
import Movies from "./components/Movies";
import MoviePage from "./components/MoviePage";
import Create from "./components/Create";
import EditMovie from "./components/EditMovie";
import AddMovieMenu from "./components/AddMovieMenu";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Movie } from "./types";
import AddMovie from "./components/AddMovie";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  const addMovie = (newMovie: Movie): void => {
    const savedMovies = JSON.parse(
      localStorage.getItem("movies") || "[]"
    ) as Movie[];
    if (!savedMovies.find((movie) => movie.id === newMovie.id)) {
      const updatedMovies = [...savedMovies, newMovie];
      setMovies(updatedMovies);
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
    }
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
    <>
      <Navbar
        setSearchQuery={setSearchQuery}
        setMessage={setMessage}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        setCurrentPage={setCurrentPage}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Movies
              movies={movies}
              setMovies={setMovies}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              message={message}
              showFavorites={showFavorites}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setShowFavorites={setShowFavorites}
            />
          }
        />
        <Route path="/:id" element={<MoviePage movies={movies} />} />
        <Route path="/add_movie" element={<AddMovieMenu />} />
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
          path="/find"
          element={
            <AddMovie
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
    </>
  );
};

export default App;

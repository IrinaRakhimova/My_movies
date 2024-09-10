import React, { useState, useEffect } from "react";
import './App.css';
import Movies from './components/Movies';
import MoviePage from "./components/MoviePage";
import Create from "./components/Create";
import EditMovie from "./components/EditMovie";
import Welcome from "./components/Welcome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Movie } from './types';
import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_API_KEY
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie';
const movieIds = [808, 120, 27205, 18785, 676685, 23172, 10327, 1927, 313106, 603, 671, 438631];

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviePromises = movieIds.map(async (id) => {
          const response = await axios.get(`${TMDB_API_URL}/${id}`, {
            params: {
              api_key: TMDB_API_KEY,
              language: 'ru-RU',
            },
          });

          const movieData = response.data;

          return {
            id: movieData.id,
            name: movieData.title,
            about: movieData.overview,
            image: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`,
            rating: Math.round(movieData.vote_average * 10),
            isLiked: false,
          };
        });

        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies);
        localStorage.setItem('movies', JSON.stringify(fetchedMovies)); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (movies.length === 0) {
      fetchMovies();
    }
  }, [movies.length]); 

  const addMovie = (newMovie: Movie): void => {
    const moviesCombined = [newMovie, ...movies];
    setMovies(moviesCombined);
    localStorage.setItem("movies", JSON.stringify(moviesCombined));
  };

  const removeMovie = (id: number): void => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const isInMovies = (id: number): boolean => {
    return movies.some(movie => movie.id === id);
  };

  return (
      <Routes>
        <Route 
          path="/" 
          element={<Welcome />} 
        />
        <Route 
          path="/products" 
          element={
            <Movies 
              movies={movies} 
              setMovies={setMovies} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          } 
        />
        <Route 
          path="/products/:id" 
          element={<MoviePage movies={movies} />} 
        />
        <Route 
          path="/products/create" 
          element={
            <Create 
              addMovie={addMovie} 
              removeMovie={removeMovie} 
              isInMovies={isInMovies} 
            />
          } 
        />
        <Route 
          path="/products/edit/:id" 
          element={<EditMovie movies={movies} setMovies={setMovies} />} 
        />
      </Routes>
  );
}

export default App;
import React from "react";
import { useState } from "react";
import './App.css';
import Movies from './components/Movies';
import MoviePage from "./components/MoviePage";
import Create from "./components/Create";
import EditMovie from "./components/EditMovie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() { 
  const [movies, setMovies] = useState([
    { id: 809, 
      name: "Shrek 2", 
      about: "Shrek, Fiona, and Donkey set off to Far, Far Away to meet Fiona's mother and father, the Queen and King.", 
      image: "https://image.tmdb.org/t/p/w500/2yYP0PQjG8zVqturh1BAqu2Tixl.jpg" },
    { id: 2, name: "Film 2", about: "This is a good movie" },
    { id: 3, name: "Film 3", about: "This is a good movie" },
    { id: 4, name: "Film 4", about: "This is a good movie" },
    { id: 5, name: "Film 5", about: "This is a good movie" },
    { id: 6, name: "Film 6", about: "This is a good movie" },
    { id: 7, name: "Film 7", about: "This is a good movie" },
    { id: 8, name: "Film 8", about: "This is a good movie" },
    { id: 9, name: "Film 9", about: "This is a good movie" },
    { id: 10, name: "Film 10", about: "This is a good movie" },
    { id: 11, name: "Film 11", about: "This is a good movie" },
    { id: 12, name: "Film 12", about: "This is a good movie" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");

  const addMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
  };

  const removeMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
};

  const isInMovies = (id) => {
    return movies.some(movie => movie.id === id);
  };



  const router = createBrowserRouter(createRoutesFromElements(
      <>
          <Route path="products" element={ <Movies movies={movies} setMovies={setMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> } />
          <Route path="products/:id" element={ <MoviePage movies={movies} /> }/>
          <Route path="products/create" element={ <Create addMovie={addMovie} removeMovie={removeMovie} isInMovies={isInMovies} /> }/>
          <Route path="products/edit/:id" element={ <EditMovie movies={movies} setMovies={setMovies} /> } />
          
      </>
  ));


    return (
      <RouterProvider router={ router } />
    );
}

export default App;
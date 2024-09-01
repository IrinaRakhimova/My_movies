import React from "react";
import { useState } from "react";
import './App.css';
import Movies from './components/Movies';
import MoviePage from "./components/MoviePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() { 
  const [movies, setMovies] = useState([
    { id: 1, name: "Film 1" },
    { id: 2, name: "Film 2" },
    { id: 3, name: "Film 3" },
    { id: 4, name: "Film 4" },
    { id: 5, name: "Film 5" },
    { id: 6, name: "Film 6" }
  ]); 

  const router = createBrowserRouter(createRoutesFromElements(
      <>
          <Route path="products" element={ <Movies movies={movies} setMovies={setMovies} /> } />
          <Route path="products/:id" element={ <MoviePage movies={movies} /> }/>
      </>
  ));


    return (
      <RouterProvider router={ router } />
    );
}

export default App;
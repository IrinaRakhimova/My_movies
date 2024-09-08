import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import "../App.css";
import left from "../images/left.svg";
import right from "../images/right.svg";
import { Movie } from '../types';

interface MoviesProps {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ITEMS_PER_PAGE = 9;
const MAX_PAGE_BUTTONS = 15;

const Movies: React.FC<MoviesProps> = ({ movies, setMovies, searchQuery, setSearchQuery }) => {
    const [message, setMessage] = useState<string>("");
    const [filterMessage, setFilterMessage] = useState<string>("");
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ratingFilter, setRatingFilter] = useState<string>("all");

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('movies') || '[]') as Movie[];
        setMovies(savedMovies);
    }, [setMovies]);

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [movies]);

    const handleDelete = (id: number) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    const handleToggleLike = (id: number) => {
        const updatedMovies = movies.map(movie =>
            movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
        );
        setMovies(updatedMovies);
    };

    const filteredMovies = movies.filter(movie => {
        const matchesSearch =
            movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.about.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFavorites = !showFavorites || movie.isLiked;

        const matchesRating =
            ratingFilter === "all" ||
            (ratingFilter === "80-100" && movie.rating >= 80) ||
            (ratingFilter === "60-80" && movie.rating >= 60 && movie.rating < 80) ||
            (ratingFilter === "40-60" && movie.rating >= 40 && movie.rating < 60) ||
            (ratingFilter === "0-40" && movie.rating < 40);

        return matchesSearch && matchesFavorites && matchesRating;
    });

    const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRating = e.target.value;
        setRatingFilter(selectedRating);
        setCurrentPage(1);

        if (selectedRating === "80-100") {
            setFilterMessage("Фильмы с рейтингом 80-100%");
        } else if (selectedRating === "60-80") {
            setFilterMessage("Фильмы с рейтингом 60-80%");
        } else if (selectedRating === "40-60") {
            setFilterMessage("Фильмы с рейтингом 40-60%");
        } else if (selectedRating === "0-40") {
            setFilterMessage("Фильмы с рейтингом меньше 40%");
        } else {
            setFilterMessage("");
        }
    };

    const renderPagination = (): JSX.Element => {
        let pages: JSX.Element[] = [];
        let startPage = 1;
        let endPage = Math.min(totalPages, MAX_PAGE_BUTTONS);
    
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }
    
        return (
            <>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        <img src={left} alt="Previous" />
                    </button>
                </li>
                {totalPages > MAX_PAGE_BUTTONS && (
                    <>
                        {pages}
                        <li className="page-item">
                            <span className="page-link">...</span>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                                {totalPages}
                            </button>
                        </li>
                    </>
                )}
                {totalPages <= MAX_PAGE_BUTTONS && pages}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        <img src={right} alt="Next" />
                    </button>
                </li>
            </>
        );
    };

    return (
        <div>
            <Navbar
                setSearchQuery={setSearchQuery}
                setMessage={setMessage}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
                setCurrentPage={setCurrentPage}
            />
            <main className="container">
                <div className="d-flex justify-content-end mt-3" id="rating-container">
                    <select
                        className="form-select rating"
                        aria-label="Rating"
                        onChange={handleRatingChange}
                        style={{ width: "13rem", cursor: "pointer" }}
                    >
                        <option value="all">Любой рейтинг</option>
                        <option value="80-100">Рейтинг 80-100%</option>
                        <option value="60-80">Рейтинг 60-80%</option>
                        <option value="40-60">Рейтинг 40-60%</option>
                        <option value="0-40">Рейтинг меньше 40%</option>
                    </select>
                </div>
                <div className="text-center fw-bold">
                    {searchQuery && <p>{message}</p>}
                    {filterMessage && <p>{filterMessage}</p>}
                </div>
                <div className="row justify-content-center mt-3 mb-3">
                    {currentMovies.map((movie) => (
                        <div className="col-md-4 d-flex justify-content-center mb-4" key={movie.id}>
                            <MovieCard movie={movie} onDelete={handleDelete} onToggleLike={handleToggleLike} />
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">{renderPagination()}</ul>
                        </nav>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Movies;
import { useState,  ChangeEvent } from "react";
import MoviesPreview from "./MoviesPreview";
import left from "../images/left.svg";
import right from "../images/right.svg";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

interface AddMovieProps {
    addMovie: (movie: any) => void;
    removeMovie: (id: number) => void;
    isInMovies: (id: number) => boolean;
}

function AddMovie({ addMovie, removeMovie, isInMovies }: AddMovieProps) {
    const tmdbKey = process.env.REACT_APP_API_KEY;
    const tmdbBaseUrl = 'https://api.themoviedb.org/3';
    const MAX_PAGE_BUTTONS = 15;

    const [keyword, setKeyword] = useState<string>("");
    const [results, setResults] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [noResults, setNoResults] = useState<boolean>(false);

    const options: RequestInit = { method: 'GET', headers: { accept: 'application/json' } };

    const fetchMovies = async (searchTerm: string, pageNumber: number): Promise<Movie[]> => {
        const requestParams = `?api_key=${tmdbKey}&query=${searchTerm}&page=${pageNumber}&language=ru`;
        const response = await fetch(`${tmdbBaseUrl}/search/movie${requestParams}`, options);
        const data = await response.json();

        setTotalPages(data.total_pages);
        setNoResults(data.results.length === 0);

        return data.results;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);
        setCurrentPage(1);

        if (newKeyword) {
            fetchMovies(newKeyword, 1).then((initialResults) => {
                setResults(initialResults);
            });
        } else {
            setResults([]);
            setTotalPages(0);
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        fetchMovies(keyword, page).then((newResults) => {
            setResults(newResults);
        });
    };

    const renderPagination = () => {
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
        <div className="container">
            <div className="row mb-3">
                <div className="me-5 pe-3 w-100">
                    <div className="col-sm-10 mt-4 d-flex flex-column justify-content-center align-items-center w-100">
                        <h1 className="text-center mt-4">Найти фильм</h1>
                        <input
                            type="search"
                            className="form-control w-50 mt-3"
                            id="Movie"
                            placeholder="Начните вводить название фильма"
                            value={keyword}
                            onChange={handleChange}
                        />
                        {noResults && (
                            <div className="text-center mt-3" style={{ color: "red" }}>
                                Список пуст. Введите другой запрос.
                            </div>
                        )}
                    </div>
                    <div className="row justify-content-center g-3 mt-3">
                        {results.map((movie) => (
                            <MoviesPreview
                                key={movie.id}
                                name={movie.title}
                                id={movie.id}
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                about={movie.overview}
                                rating={Math.round(movie.vote_average * 10)}
                                addMovie={addMovie}
                                removeMovie={removeMovie}
                                isInMovies={isInMovies}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav>
                                <ul className="pagination">{renderPagination()}</ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddMovie;
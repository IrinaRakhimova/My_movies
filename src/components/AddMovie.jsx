import { useState, useEffect } from "react";
import MoviesPreview from "./MoviesPreview";

function AddMovie({ addMovie, setMovies, removeMovie, isInMovies }) {
    const tmdbKey = '8fdcec10b06a580073073c04bcb6bad2';
    const tmdbBaseUrl = 'https://api.themoviedb.org/3';
    const ITEMS_PER_PAGE = 24;
    const MAX_PAGE_BUTTONS = 15;

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [noResults, setNoResults] = useState(false);

    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const fetchMovies = (searchTerm, pageNumber) => {
        const requestParams = `?api_key=${tmdbKey}&query=${searchTerm}&page=${pageNumber}&language=ru`;

        return fetch(`${tmdbBaseUrl}/search/movie${requestParams}`, options)
            .then(response => response.json())
            .then(data => {
                setTotalPages(data.total_pages);
                setNoResults(data.results.length === 0);
                return data.results;               
            });
    };

    const handleChange = (e) => {
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

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return; 
        setCurrentPage(page);
        fetchMovies(keyword, page).then((newResults) => {
            setResults(newResults);
        });
    };

    const renderPagination = () => {
        let pages = [];
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
                        Предидущая
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
                        Следующая
                    </button>
                </li>
            </>
        );
    };
    return (
            <div className="row mb-3 container">
                <div className="mx-5">
                    
                    <div className="col-sm-10 mt-4 d-flex flex-column justify-content-center align-items-center" style={{width: "1200px"}}>
                        <h1 className="text-center mt-4">Найти фильм</h1>
                        <input type="search" className="form-control w-50 mt-3" id="Movie" placeholder="Начните вводть название фильма" value={keyword} onChange={handleChange} />
                        {noResults && (
                        <div className="text-center mt-3" style={{ color: "red" }}>
                            Список пуст. Введите другой запрос.
                        </div>
                        )}
                    </div>
                    
                    <div className="row mt-3">
                    {results.map(movie => (
                        <div className="col-md-3 d-flex justify-content-center mb-4" key={movie.id}>
                            <MoviesPreview 
                                name={movie.title} 
                                id={movie.id} 
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                about={movie.overview}
                                rating={Math.round(movie.vote_average*10)}
                                addMovie={addMovie}
                                removeMovie={removeMovie}
                                isInMovies={isInMovies}
                            />
                        </div>
                    ))}
                    </div>
                    {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {renderPagination()}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddMovie;

import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function Navbar({ setSearchQuery, setMessage, setShowFavorites, showFavorites, setCurrentPage, setRatingFilter }) {
    
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false); 

    const handleClick = () => {
        navigate(`/products/create`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setMessage(`Результаты по запросу: ${e.target.value}`)
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
        setCurrentPage(1);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <>
            <nav className="navbar sticky-top bg-body-tertiary bg-body-tertiary" style={{width: "100%"}}>
                <div className="container-fluid">
                    <a href="#" className="navbar-brand new-amsterdam-regular fs-1">My movies</a>
                    <div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Добавить фильм</button>
                            <button type="button" className="btn btn-secondary mx-3" onClick={toggleFavorites}>
                                {showFavorites ? "Показать все" : "Показать любимые"}
                            </button>
                            <form className="d-flex" role="search">
                                <input className="form-control" type="search" placeholder="Поиск" aria-label="Поиск" onChange={handleSearch}/>
                            </form>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "blue",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    fontSize: "inherit",
                                    fontFamily: "inherit",
                                    padding: 0,
                                    margin: 0,
                                }}
                                onClick={toggleFilters}
                            >
                                {showFilters ? "Скрыть фильтр" : "Фильтр по рейтигну"}
                            </button>
                        </div>
                    </div>
                </div>   
            </nav>
            {showFilters && <Filters setRatingFilter={setRatingFilter}/>}
        </>
    );
}

export default Navbar;


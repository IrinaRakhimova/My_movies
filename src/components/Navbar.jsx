import { useNavigate } from "react-router-dom";
import plus from "../plus.svg";
import heart from "../heart_small.svg";
import "../App.css";

function Navbar({ setSearchQuery, setMessage, setShowFavorites, showFavorites, setCurrentPage }) {
    
    const navigate = useNavigate();

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

    return (
        <>
            <nav className="navbar sticky-top" style={{width: "100%", backgroundColor: "black"}}>
                <div className="container-fluid" style={{maxWidth: "1290px"}}>
                    <a href="#" className="navbar-brand new-amsterdam-regular fs-1 ms-5" style={{color: "white"}}>My movies</a>
                        <div className="d-flex me-5 navigation">
                            <button type="button" className="btn btn-primary " onClick={handleClick} style={{width: "13rem"}}><img src={plus} className="mb-1"/> Добавить фильм</button>
                            <button type="button" className="btn btn-secondary mx-3" id="nav-button" onClick={toggleFavorites}  style={{width: "13rem"}}>
                                {showFavorites ? "Показать все" : <p className="mb-0"><img src={heart}/> Показать любимые</p>}
                            </button>
                            <form className="d-flex ms-5" role="search" style={{width: "13rem"}} id="nav-input">
                                <input className="form-control" type="search" placeholder="Поиск" aria-label="Поиск" onChange={handleSearch}/>
                            </form>
                    </div>
                </div>   
            </nav>
        </>
    );
}

export default Navbar;


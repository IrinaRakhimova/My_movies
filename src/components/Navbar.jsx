import { useNavigate } from "react-router-dom";

function Navbar({ setSearchQuery, setMessage, setShowFavorites, showFavorites }) {
    
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(`/products/create`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setMessage(`Search: ${e.target.value}`)
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand">My movies</a>
                <div>
                    <div className="d-flex">
                        <button type="button" class="btn btn-primary" onClick={handleClick}>Add a movie</button>
                        <button type="button" className="btn btn-secondary mx-3" onClick={toggleFavorites}>
                            {showFavorites ? "Show All" : "My Favorite Movies"}
                        </button>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
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
                        >Filters</button>
                    </div>
                </div>
            </div>   
        </nav>
    );
}

export default Navbar;


import { useNavigate } from "react-router-dom";

function Navbar({ setSearchQuery, setMessage }) {
    
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(`/products/create`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setMessage(`Search: ${e.target.value}`)
    };

    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand">My movies</a>
                <button type="button" class="btn btn-primary" onClick={handleClick}>Add a movie</button>
                <button type="button" class="btn btn-primary">My favourite movies</button>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;


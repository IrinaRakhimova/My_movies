import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import plus from "../images/plus.svg";
import heart from "../images/heart_small.svg";
import "../App.css";

interface NavbarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  showFavorites: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar: React.FC<NavbarProps> = ({
  setSearchQuery,
  setMessage,
  setShowFavorites,
  showFavorites,
  setCurrentPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/add_movie`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setMessage(`Результаты по запросу: ${e.target.value}`);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav
        className="navbar sticky-top"
        style={{ width: "100%", backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <a
            href="/My_movies/#/"
            className="navbar-brand new-amsterdam-regular fs-1 ms-5"
            style={{ color: "white" }}
          >
            My movies
          </a>

          {isHomePage && (
            <div className="d-flex me-5 navigation">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                style={{ width: "13rem" }}
              >
                <img src={plus} className="mb-1" alt="Add" /> Add Movie
              </button>

              <button
                type="button"
                className="btn btn-secondary mx-3"
                id="nav-button"
                onClick={toggleFavorites}
                style={{ width: "13rem" }}
              >
                {showFavorites ? (
                  "Show All"
                ) : (
                  <p className="mb-0">
                    <img src={heart} alt="Favorites" /> Show Favorites
                  </p>
                )}
              </button>

              <form
                className="d-flex ms-5"
                role="search"
                style={{ width: "13rem" }}
                id="nav-input"
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="Поиск"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

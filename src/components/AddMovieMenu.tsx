import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import arrow from "../images/arrow.svg";

const AddMovieMenu: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button
        className="btn btn-secondary mx-5 mt-2"
        onClick={handleClick}
        style={{ backgroundColor: "white", border: "none", color: "#0d6efd" }}
      >
        <img src={arrow} alt="arrow" /> Home Page
      </button>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <h1 className="mb-5 text-center">What would you like to do?</h1>
        <div className="d-flex gap-4">
          <Link to="/find" className="btn btn-primary btn-lg px-5 py-3">
            🎬 Find a Movie
          </Link>
          <Link to="/create" className="btn btn-success btn-lg px-5 py-3">
            ➕ Add Your Own Movie
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddMovieMenu;

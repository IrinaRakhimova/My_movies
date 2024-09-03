import React, { useState } from "react";
import placeholder from "../film_placeholder.png";
import { useNavigate } from "react-router-dom";
import AddMovie from "./AddMovie";

function Create({ addMovie }) {

    const [movieName, setMovieName] = useState("");
    const [movieAbout, setMovieAbout] = useState("");
    const [movieFile, setMovieFile] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMovieFile(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setMovieFile(placeholder);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMovie = {
            id: Date.now(),
            name: movieName,
            about: movieAbout,
            image: movieFile || placeholder,
            isLiked: false, 
    };

    addMovie(newMovie);
    setMovieName("");
    setMovieAbout("");
    setMovieFile(null);
    setMessage(`You added a new movie: ${movieName}`);
    };

    const handleClick = () => {
        navigate('/products');
    };

    return (
        <div> 
            <h1>Add a movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label for="Name" className="col-sm-2 col-form-label">Movie name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} required/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="About" className="col-sm-2 col-form-label">About</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="About" value={movieAbout} onChange={(e) => setMovieAbout(e.target.value)} required></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="formFile" className="col-sm-2 col-form-label">Add a picture</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" id="formFile" onChange={handleFileChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> 
            <p>{message}</p>
            <button className="btn btn-secondary" onClick={handleClick}>Main page</button>
            <AddMovie addMovie={addMovie} />
        </div> 
    );
}

export default Create;

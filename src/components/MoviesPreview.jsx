import placeholder from "../film_placeholder.png";
import { useState, useEffect } from "react";

function MoviesPreview({ name, id, image, about, rating, addMovie, removeMovie, isInMovies }) {

    const [isAdded, setIsAdded] = useState(() => {
        const storedIsAdded = localStorage.getItem(`isAdded_${id}`) === 'true';
        return storedIsAdded && isInMovies(id);
    });

    useEffect(() => {
        localStorage.setItem(`isAdded_${id}`, isAdded);
    }, [isAdded, id]);

    useEffect(() => {
        if (isInMovies(id) !== isAdded) {
            setIsAdded(isInMovies(id));
        }
    }, [isInMovies, id, isAdded]);

    const handleButtonClick = () => {
        if (isAdded) {
            removeMovie(id);
        } else {
            const newMovie = {
                id: id,
                name: name,
                about: about,
                image: image || placeholder,
                rating: rating,
                isLiked: false,
            };
            addMovie(newMovie);
            console.log(newMovie);
        }
        setIsAdded(!isAdded);
        
    };

    const handleImageError = (e) => {
        e.target.src = placeholder;
    };

    const handleSeeInTmdb = () => {
        const tmdbUrl = `https://www.themoviedb.org/movie/${id}`;
        window.open(tmdbUrl, '_blank');
    };

    return (
        <div key={id} id={id}  className='card m-2' style={{cursor: "pointer", width: "14rem", height: "28rem", overflow: "hidden" }}> 
            <img src={image} onError={handleImageError} className="card-img-top" alt={name}/>
            <div className="card-body d-flex justify-content-between align-items-center">
                <p className="card-title" style={{overflow: "hidden",  textOverflow: "ellipsis",  width: "75%"}}>
                    {name}
                </p>
            <button onClick={handleSeeInTmdb}>See in tmdb</button>     
            <button onClick={handleButtonClick}>
                    {isAdded ? "Delete" : "Add"}
            </button>                                         
            </div>
        </div>
    );
}

export default MoviesPreview;
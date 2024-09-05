import placeholder from "../film_placeholder.png";
import { useState, useEffect } from "react";

function MoviesPreview({ name, id, image, about, rating, addMovie, removeMovie, isInMovies }) {

    const [isHovered, setIsHovered] = useState(false);
    
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
        <div>
            <div key={id} id={id}  className='card m-2' style={{cursor: "pointer", width: "14rem", height: "20rem", overflow: "hidden" }} onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} > 
                <img src={image} onError={handleImageError} className="card-img-top" alt={name}/>
                <div className="card-body d-flex justify-content-between align-items-center">                                                                   
                </div>
                <div 
                    style={{
                    position: 'absolute',
                    opacity: isHovered ? 1 : 0, 
                    transition: "opacity 0.3s ease",
                    zIndex: 10,
                    backgroundColor: "grey",
                    width: "100%",
                    height: "20rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
                className="p-3">
                    <div className="text-content" style={{ height: "75%" }}>
                        <p className="card-title" style={{color: "white", 
                            fontSize: "1rem", 
                            fontWeight: "bold",
                            margin: 0,
                            whiteSpace: "nowrap", 
                            overflow: "hidden", 
                            textOverflow: "ellipsis",
                            textAlign: "center"}}>
                            {name}
                        </p>
                        <p className="card-title text-center mt-1" style={{color: "white", 
                            fontSize: "0.85rem", 
                            margin: "10px 0 0 0",
                            textAlign: "center",
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 7,  // limits description to 3 lines
                            WebkitBoxOrient: 'vertical',
                            textOverflow: "ellipsis",}}>
                            {about}
                        </p> 
                    </div>                
                    <button onClick={handleButtonClick} className="btn btn-light">
                            {isAdded ? "Удалить" : "Добавить"}
                    </button>
                    <button onClick={handleSeeInTmdb} className="btn btn-outline-light mt-2">Открыть в TMBD</button>
                </div> 
            </div>
            <p className="card-title text-center fs-6" style={{width: "100%", color: "grey"}}>
                {name}
            </p>
        </div>
    );
}

export default MoviesPreview;
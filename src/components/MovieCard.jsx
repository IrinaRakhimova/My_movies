import { useState } from "react";
import placeholder from "../film_placeholder.png";
import heart from "../heart.svg";
import redHeart from "../red_heart.svg";
import bin from "../bin.svg";
import { useNavigate } from "react-router-dom";


const MovieCard = ({movie, onDelete, onToggleLike}) => {
    
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); 

    const toggleHeart = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        onToggleLike(movie.id);      
      };

    const handleDelete = (e) => {
        e.stopPropagation(); 
        onDelete(movie.id);
      }; 
      
    const handleCardClick = () => {
        navigate(`/products/${movie.id}`);
      };  

    return (
        <div key={movie.id} id={movie.id} className='card m-2' style={{ cursor: "pointer", width: "18rem" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleCardClick}>
                    <div className="d-flex justify-content-end"  style={{opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease"}}>  
                        <img src={bin} class="bi bi-trash3 m-3" alt="Delete"  onClick={handleDelete}/>
                    </div>  
                    <img src={movie.image || placeholder} className="card-img-top" alt={movie.name}/>
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <h5 className="card-title">{movie.name}</h5>
                      
                      <img
                        src={isLiked ? redHeart : heart}
                        className="bi bi-heart"
                        alt="heart"
                        onClick={toggleHeart}
                        style={{ cursor: "pointer" }}
                      />                    
                    </div>
                    <p className="card-text m-3">{movie.about}</p>
                  </div>
    )
}

export default MovieCard;
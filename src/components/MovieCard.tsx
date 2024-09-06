import { useState, useEffect, MouseEvent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../film_placeholder.png";
import heart from "../heart.svg";
import redHeart from "../red_heart.svg";
import bin from "../bin.svg";
import edit from "../edit.svg";
import React from "react";

// Define types for the props
interface Movie {
    id: number;
    name: string;
    about: string;
    image?: string;
    isLiked?: boolean;
}

interface MovieCardProps {
    movie: Movie;
    onDelete: (id: number) => void;
    onToggleLike: (id: number, isLiked: boolean) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete, onToggleLike }) => {
    const [isLiked, setIsLiked] = useState<boolean>(movie.isLiked || false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isOverflowed, setIsOverflowed] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLiked(movie.isLiked || false);
    }, [movie.isLiked]);

    const toggleHeart: MouseEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        const newLikedStatus = !isLiked;
        setIsLiked(newLikedStatus);
        onToggleLike(movie.id, newLikedStatus);
    };

    const handleEdit: MouseEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        navigate(`/products/edit/${movie.id}`);
    };

    const handleDelete: MouseEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        onDelete(movie.id);
    };

    const handleCardClick = () => {
        navigate(`/products/${movie.id}`);
    };

    useEffect(() => {
        const element = document.getElementById(`about-text-${movie.id}`);
        if (element) {
            setIsOverflowed(element.scrollHeight > element.clientHeight);
        }
    }, [movie.id]);

    return (
        <div
            key={movie.id}
            id={`${movie.id}`}
            className='card m-2'
            style={{
                cursor: "pointer",
                width: "18rem",
                height: "30rem",
                overflow: "hidden",
                position: "relative"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20rem',
                }}
            >
                <img
                    src={movie.image || placeholder}
                    alt={movie.name}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'cover'
                    }}
                    className="mt-4"
                />
            </div>
            <div
                className="d-flex justify-content-between"
                style={{
                    position: 'absolute',
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    zIndex: 10,
                    backgroundColor: "#ffffffd6",
                    width: "100%"
                }}
            >
                <img
                    src={edit}
                    className="bi bi-pencil-square m-3"
                    alt="Edit"
                    onClick={handleEdit}
                />
                <img
                    src={bin}
                    className="bi bi-trash3 m-3"
                    alt="Delete"
                    onClick={handleDelete}
                />
            </div>
            <div
                className="card-body d-flex justify-content-between align-items-center p-0"
            >
                <h5
                    className="card-title mt-4 ms-3"
                    style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "75%"
                    }}
                >
                    {movie.name}
                </h5>
                <img
                    src={isLiked ? redHeart : heart}
                    className="bi bi-heart mt-4 me-3"
                    alt="heart"
                    onClick={toggleHeart}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <div
                className="m-3"
                id={`about-text-${movie.id}`}
                style={{
                    position: 'relative',
                    height: '4.8rem',
                    overflow: 'hidden'
                }}
            >
                <p
                    className="card-text"
                    style={{
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: 'hidden',
                        marginBottom: '0'
                    }}
                >
                    {movie.about}
                </p>
                {isOverflowed && (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${movie.id}`);
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            backgroundColor: 'white',
                            paddingLeft: '5px',
                        }}
                    >
                        ... read more
                    </a>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
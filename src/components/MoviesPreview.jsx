import placeholder from "../film_placeholder.png";

function MoviesPreview({ name, id, image, about, addMovie }) {

    const handleImageError = (e) => {
        e.target.src = placeholder;
    };

    const handleSeeInTmdb = () => {
        const tmdbUrl = `https://www.themoviedb.org/movie/${id}`;
        window.open(tmdbUrl, '_blank');
    };

    const handleAdd = () => {
        const newMovie = {
            id: id,
            name: name,
            about: about,
            image: image,
            isLiked: false, 
    };

    addMovie(newMovie);
    };

    return (
        <div key={id} id={id}  className='card m-2' style={{cursor: "pointer", width: "14rem", height: "28rem", overflow: "hidden" }}> 
            <img src={image} onError={handleImageError} className="card-img-top" alt={name}/>
            <div className="card-body d-flex justify-content-between align-items-center">
                <p className="card-title" style={{overflow: "hidden",  textOverflow: "ellipsis",  width: "75%"}}>
                    {name}
                </p>
            <button onClick={handleSeeInTmdb}>See in tmdb</button>     
            <button onClick={handleAdd}>Add</button>                                          
            </div>
        </div>
    );
}

export default MoviesPreview;
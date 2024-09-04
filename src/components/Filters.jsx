function Filters({ setRatingFilter }) {

    const handleRatingChange = (e) => {
        setRatingFilter(e.target.value);
    };

    return (
        <div>
            <div>
                <p>Rating</p>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="rating" id="flexRadioRating1" value="80-100" onChange={handleRatingChange} />
                    <label className="form-check-label" htmlFor="flexRadioRating1">
                        80%-100%
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="rating" id="flexRadioRating2" value="60-80" onChange={handleRatingChange}/>
                    <label className="form-check-label" htmlFor="flexRadioRating2">
                        60%-80%
                    </label>
                </div>    
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="rating" id="flexRadioRating3" value="40-60" onChange={handleRatingChange}/>
                    <label className="form-check-label" htmlFor="flexRadioRating3">
                        40%-60%
                    </label>
                </div>    
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="rating" id="flexRadioRating4" value="0-40" onChange={handleRatingChange}/>
                    <label className="form-check-label" htmlFor="flexRadioRating4">
                        Less than 40%
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="rating" id="flexRadioRating5" defaultChecked value="all" onChange={handleRatingChange}/>
                    <label className="form-check-label" htmlFor="flexRadioRating5">
                        Show all
                    </label>
                </div> 
            </div>
        </div>
    );
}

export default Filters;
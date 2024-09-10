import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
    
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/products');
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="mt-5">Welcome to My Movies</h1>
            <button className="btn btn-primary mx-5 mt-2" onClick={handleClick}>
                Открыть приложение
            </button>           
        </div>
    );
};

export default Welcome;
import { useNavigate } from "react-router";
import userImage from "../../../assets/userImage.svg"
import './Card.css'

const Card = ({user}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(user.id);
        navigate(`/users/${user.id}`);
    };

    return (
        <>
        <div class="card">
          <div class="card-border-top">
          </div>
          <div class="img"><img src={userImage} width={70}></img>
          </div>
          <span>{user.name}</span>
          <p class="job">{user.email}</p>
          <button onClick={handleClick}> Ver más
          </button>
        </div>
        </>
    );
};

export default Card;
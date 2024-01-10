import { NavLink } from "react-router-dom";
import 'bulma/css/bulma.css';
import '../ingredient.css'

const IngredientDisplay = ({ ingredient }) => {
    return (
        <div className="ingredient-display">
            <NavLink to={`/ingredients/${ingredient.id}`} className="ingredient-link">
                <h3 className="subtitle is-6">{ingredient.name}</h3>
                <img className="ingredient-image" src={ingredient.image} alt="ingredient"></img>
            </NavLink>
        </div>
    );
}

export default IngredientDisplay;

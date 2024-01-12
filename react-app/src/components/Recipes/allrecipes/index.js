import { NavLink } from "react-router-dom";
import 'bulma/css/bulma.css';
import '../recipes.css'

const RecipeDisplay = ({ recipe }) => {
    return (
        <div className="recipe-display">
            <NavLink to={`/recipes/${recipe.id}`} className="recipe-link">
                <h2 className="title is-4">{recipe.name}</h2>
                <img className="recipe-image" src={recipe.image} alt={recipe.name}></img>
            </NavLink>
        </div>
    );
}

export default RecipeDisplay;

import { NavLink } from "react-router-dom"

const RecipeDisplay = ({ recipe }) => {
    return (
        <NavLink to={`/recipes/${recipe.id}`} className="recipe-display">
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name}></img>
        </NavLink>
    )
}
export default RecipeDisplay

import { NavLink } from "react-router-dom"

const RecipeDisplay = ({ recipe }) => {
    return (
        <NavLink to={`/recipes/${recipe.id}`} className="recipe-display">
            <h2>{recipe.name}</h2>
            <img style={{ objectFit: "cover" }} src={recipe.image} alt={recipe.name}></img>
        </NavLink>
    )
}
export default RecipeDisplay

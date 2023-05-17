import { NavLink } from "react-router-dom"






const RecipeDisplay = ({ recipe }) => {
    return (
        <NavLink to={`/recipe/${recipe.id}`} className="recipe-display">
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt="recipe"></img>
        </NavLink>
    )
}
export default RecipeDisplay

import { NavLink } from "react-router-dom"

const RecipeDisplay = ({ recipe }) => {
    return (
        <div className="recipe-displayment">
            <NavLink to={`/recipes/${recipe.id}`} className="recipe-display">
                <h2>{recipe.name}</h2>
                <img style={{ objectFit: "cover" }} src={recipe.image} alt={recipe.name}></img>
            </NavLink>
        </div>
    )
}
export default RecipeDisplay

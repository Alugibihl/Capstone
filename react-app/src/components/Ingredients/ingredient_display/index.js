import { NavLink } from "react-router-dom"
import "../ingredient.css"
const IngredientDisplay = ({ ingredient }) => {
    return (
        <NavLink to={`/ingredients/${ingredient.id}`} className="ingredient-display">
            <h1>{ingredient.name}</h1>
            <img src={ingredient.image} alt="ingredient"></img>
        </NavLink>
    )
}
export default IngredientDisplay

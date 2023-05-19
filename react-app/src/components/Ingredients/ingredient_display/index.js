import { NavLink } from "react-router-dom"
import "../ingredient.css"
const IngredientDisplay = ({ ingredient }) => {
    return (
        <NavLink to={`/ingredients/${ingredient.id}`} className="ingredient-display">
            <h3>{ingredient.name}</h3>
            <img style={{ objectFit: "cover" }} src={ingredient.image} alt="ingredient"></img>
        </NavLink>
    )
}
export default IngredientDisplay

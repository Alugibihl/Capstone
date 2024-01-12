import { NavLink } from "react-router-dom"
import "../ingredient.css"
const UserIngredientDisplay = ({ ingredient }) => {
    return (
        <div className="recipe-display">
            <NavLink className="recipe-link" to={`/ingredients/${ingredient.id}`}>
                <h3 className="title is-4">{ingredient.name}</h3>
                <img className="recipe-image" style={{ objectFit: "cover" }} src={ingredient.image} alt="ingredient"></img>
            </NavLink>
        </div>
    )
}
export default UserIngredientDisplay

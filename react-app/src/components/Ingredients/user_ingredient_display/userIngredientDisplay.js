import { NavLink } from "react-router-dom"
import "../ingredient.css"
const UserIngredientDisplay = ({ ingredient }) => {
    return (
        <div className="recipe-displayment">
            <NavLink className="recipe-display" to={`/ingredients/${ingredient.id}`}>
                <h3>{ingredient.name}</h3>
                <img style={{ objectFit: "cover" }} src={ingredient.image} alt="ingredient"></img>
            </NavLink>
        </div>
    )
}
export default UserIngredientDisplay

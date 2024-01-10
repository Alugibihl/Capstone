import { NavLink } from "react-router-dom"
import 'bulma/css/bulma.css';

const CategoryDisplay = ({ category }) => {
    return (
        <NavLink className="navbar-item" to={`/categories/${category.id}`}
            category={category} >{category.name}
        </NavLink>
    )
}
export default CategoryDisplay

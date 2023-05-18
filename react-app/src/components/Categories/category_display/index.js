import { NavLink } from "react-router-dom"

const CategoryDisplay = ({ category }) => {
    return (
        <NavLink to={`/categories/${category.id}`}
            category={category} className="recipe-display">{category.name}
        </NavLink>
    )
}
export default CategoryDisplay

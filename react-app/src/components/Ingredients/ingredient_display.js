import "./ingredient.css"
const IngredientDisplay = ({ ingredient }) => {
    return (
        <div className="ingredient-display">
            <h1>{ingredient.name}</h1>
            <img src={ingredient.image} alt="ingredient"></img>
        </div>
    )
}
export default IngredientDisplay

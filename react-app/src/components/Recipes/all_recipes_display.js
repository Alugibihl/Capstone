





const RecipeDisplay = ({ recipe }) => {
    return (
        <div className="recipe-display">
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt="recipe"></img>
        </div>
    )
}
export default RecipeDisplay

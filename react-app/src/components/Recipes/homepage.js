import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import "./recipes.css"
import { GetAllRecipesThunk } from "../../store/recipes"
import RecipeDisplay from "./all_recipes_display"
import IngredientDisplay from "../Ingredients/ingredient_display"


const HomePage = () => {
    const recipes = useSelector(state => state.recipes.recipes)
    const ingredients = useSelector(state => state.recipes.recipes.ingredients)

    console.log("-------------", recipes, ingredients);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllRecipesThunk())
    }, [dispatch])

    // const recipesArr = Object.values(recipes)
    if (!recipes.recipes) return null
    return (
        <div className="homepage-outer">
            <div className="home-recipe">
                {recipes.recipes.map((recipe) => {
                    return <RecipeDisplay key={recipe.id} recipe={recipe} />
                })}
            </div>
            <div className="home-ingredients">
                {ingredients.map((ingredient) => {
                    return <IngredientDisplay key={ingredient.id} ingredient={ingredient} />
                })}
            </div>
        </div>
    )
}

export default HomePage
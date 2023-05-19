import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import "./recipes.css"
import { getAllRecipesThunk } from "../../store/recipes"
import IngredientDisplay from "../Ingredients/ingredient_display"
import RecipeDisplay from "./allrecipes"
import CategoryDisplay from "../Categories/category_display"

const HomePage = () => {
    const recipes = useSelector(state => state.recipes.recipes)
    const ingredients = useSelector(state => state.recipes.recipes.ingredients)
    const categories = useSelector(state => state.recipes.recipes.categories)
    const dispatch = useDispatch()
    console.log("-------------", recipes, ingredients, categories);

    useEffect(() => {
        dispatch(getAllRecipesThunk())
    }, [dispatch])

    let recipesArr = []
    let ingredientsArr = []
    if (!recipes) return null
    if (!ingredients) return null
    if (!categories) return null

    for (let recipe of recipes.recipes) {
        if (recipesArr.length < 10) {
            recipesArr.push(recipe)
        }
    }
    if (ingredients.length) {
        for (let ingredient of ingredients) {
            if (ingredientsArr.length < 21) {
                ingredientsArr.push(ingredient)
            }
        }
    }
    return (
        <>
            <div className="category-bar">
                {categories.map((category) => {
                    return <CategoryDisplay key={category.id} category={category} />
                })}
            </div>
            <div className="homepage-outer">
                <div className="home-recipe">
                    {recipesArr.map((recipe) => {
                        return <RecipeDisplay key={recipe.id} recipe={recipe} />
                    })}
                </div>
                <div className="home-ingredients">
                    {ingredientsArr.map((ingredient) => {
                        return <IngredientDisplay key={ingredient.id} ingredient={ingredient} />
                    })}
                </div>
            </div>
        </>
    )
}

export default HomePage

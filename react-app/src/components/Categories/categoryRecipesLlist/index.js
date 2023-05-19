import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllRecipesThunk } from "../../store/recipes"

const CategoryRecipes = () => {
    const recipes = useSelector(state => state.recipes.recipes)
    const ingredients = useSelector(state => state.recipes.recipes.ingredients)
    const categories = useSelector(state => state.recipes.recipes.categories)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllRecipesThunk())
    }, [dispatch])

    let recipesArr = []
    let ingredientsArr = []
    if (!recipes) return null
    if (!ingredients) return null
    if (!categories) return null

    for (let recipe of recipes.recipes) {
        if (recipesArr.length < 12) {
            recipesArr.push(recipe)
        }
    }
    if (ingredients.length) {
        for (let ingredient of ingredients) {
            if (ingredientsArr.length < 15) {
                ingredientsArr.push(ingredient)
            }
        }
    }
    return (
        <div className="category-recipe-page">
            
        </div>
    )
}

export default CategoryRecipes

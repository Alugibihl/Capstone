import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipeByUser } from "../../../store/recipes"
import RecipeDisplay from "../allrecipes"


const UserRecipes = () => {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes.recipes.recipes)
    console.log("___recipes___", recipes);

    useEffect(() => {
        dispatch(getRecipeByUser())
    }, [dispatch])

    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Your Recipes</h1>
                <div>{recipes?.map((recipe) => {
                    return <RecipeDisplay key={recipe.id} recipe={recipe} />
                })}</div>
            </div>
        </div>
    )
}

export default UserRecipes

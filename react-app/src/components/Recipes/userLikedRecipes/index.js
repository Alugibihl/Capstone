import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedRecipeByUser } from "../../../store/recipes"
import RecipeDisplay from "../allrecipes"
import NotFound from "../../PageNotFound"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const UserLikedRecipes = () => {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes.recipes.liked_recipes)
    const history = useHistory()
    // console.log("hello", recipes);

    useEffect(() => {
        dispatch(getLikedRecipeByUser())
    }, [dispatch])

    const home = () => {
        let path = "/"
        history.push(path)
    }

    if (!recipes) return <NotFound />

    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Recipes You've Liked</h1>
                <div>
                    {recipes?.length === 0 ? <div><div>No Recipes Liked, Try some out now!</div>
                        <div className="modal-buttons">
                            <button className="green-button" onClick={home}>Back to Recipes</button>
                        </div></div> : null}
                </div>
                <div>{recipes.map((recipe) => {
                    return <RecipeDisplay key={recipe.id} recipe={recipe} />
                })}</div>
            </div>
        </div >
    )
}

export default UserLikedRecipes

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipeByUser } from "../../../store/recipes"
import RecipeDisplay from "../allrecipes"
import OpenModalButton from "../../OpenModalButton"
import CreateRecipeModal from "../createRecipes"
import NotFound from "../../PageNotFound"

const UserRecipes = () => {
    const dispatch = useDispatch()
    // const sessionUser = useSelector((state) => state.session.user);
    const recipes = useSelector(state => state.recipes.recipes.recipes)
    // console.log("___recipes___", recipes);

    useEffect(() => {
        dispatch(getRecipeByUser())
    }, [dispatch])

    if (!recipes) return <NotFound />
    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Your Recipes</h1>
                <div>
                    {recipes?.length === 0 ? <div><div>No Recipes Yet. Make one now!</div>
                        <div className="modal-buttons"><OpenModalButton
                            className="green-button"
                            buttonText={"Create your first Recipe!"}
                            modalComponent={<CreateRecipeModal />} /></div></div> : null}
                </div>
                <div>{recipes.map((recipe) => {
                    return <RecipeDisplay key={recipe.id} recipe={recipe} />
                })}</div>
            </div>
        </div>
    )
}

export default UserRecipes

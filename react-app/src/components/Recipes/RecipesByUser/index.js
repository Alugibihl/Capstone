import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipeByUser } from "../../../store/recipes"
import RecipeDisplay from "../allrecipes"
import { Redirect } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import CreateRecipeModal from "../createRecipes"


const UserRecipes = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const recipes = useSelector(state => state.recipes.recipes.recipes)
    console.log("___recipes___", recipes);

    useEffect(() => {
        dispatch(getRecipeByUser())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/login" />
    if (!recipes) return null
    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Your Recipes</h1>
                <div>
                    {recipes?.length === 0 ? <div><div>"No Recipes Yet"</div>
                        <div><OpenModalButton
                            className="green-button"
                            buttonText={"Create your first Recipe!"}
                            modalComponent={<CreateRecipeModal />} /></div></div> : null}
                </div>
                <div>{recipes?.map((recipe) => {
                    return <RecipeDisplay key={recipe.id} recipe={recipe} />
                })}</div>
            </div>
        </div>
    )
}

export default UserRecipes

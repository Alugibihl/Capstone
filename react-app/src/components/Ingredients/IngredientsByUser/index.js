import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIngredientsByUser } from "../../../store/ingredients"
import IngredientDisplay from "../ingredient_display"
import { Redirect } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import CreateIngredientModal from "../add_ingredient_modal"



const UserIngredients = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredients)
    const sessionUser = useSelector(state => state.session.user)
    console.log("___ingredients___", ingredients);


    useEffect(() => {
        dispatch(getIngredientsByUser())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/login" />
    if (!ingredients) return null

    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Your Ingredients</h1>
                <div>{ingredients?.length === 0 ? <div><div>No Ingredients Yet. Make one Now!</div>
                    <div><OpenModalButton
                        className="green-button"
                        buttonText={"Create your First Ingredient!"}
                        modalComponent={<CreateIngredientModal />} /></div></div> : null}</div>
                <div>
                    {ingredients?.map((ingredient) => {
                        return <IngredientDisplay key={ingredient.id} ingredient={ingredient} />
                    })}
                </div>
            </div>
        </div >
    )
}

export default UserIngredients

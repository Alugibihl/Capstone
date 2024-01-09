import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIngredientsByUser } from "../../../store/ingredients"
import OpenModalButton from "../../OpenModalButton"
import CreateIngredientModal from "../add_ingredient_modal"
import UserIngredientDisplay from "../user_ingredient_display/userIngredientDisplay"
import 'bulma/css/bulma.css';


const UserIngredients = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredients)

    useEffect(() => {
        dispatch(getIngredientsByUser())
    }, [dispatch])

    if (!ingredients) return null

    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Your Ingredients</h1>
                <div>{ingredients?.length === 0 ? <div><div>No Ingredients Yet. Make one Now!</div>
                    <div className="modal-buttons"><OpenModalButton
                        className="button is-success is-rounded is-medium"
                        buttonText={"Create your First Ingredient!"}
                        modalComponent={<CreateIngredientModal />} /></div></div> : null}</div>
                <div>
                    {ingredients?.map((ingredient) => {
                        return <UserIngredientDisplay key={ingredient.id} ingredient={ingredient} />
                    })}
                </div>
            </div>
        </div >
    )
}

export default UserIngredients

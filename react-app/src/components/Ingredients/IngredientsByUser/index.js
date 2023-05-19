import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIngredientsByUser } from "../../../store/ingredients"
import IngredientDisplay from "../ingredient_display"


const UserIngredients = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredients)
    console.log("___ingredients___", ingredients);

    useEffect(() => {
        dispatch(getIngredientsByUser())
    }, [dispatch])

    return (
        <div className="my-posts-container">
            <div className="my-posts">
                <h1>Your Ingredients</h1>
                <div>
                    {ingredients?.map((ingredient) => {
                        return <IngredientDisplay key={ingredient.id} ingredient={ingredient} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserIngredients

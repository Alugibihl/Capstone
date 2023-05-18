import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import { deleteIngredientThunk } from "../../../store/ingredients"

const DeleteIngredientModal = ({ ingredient }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const ingredientId = ingredient.id
    const deleter = async () => {
        await dispatch(deleteIngredientThunk(ingredientId))
        closeModal()
        history.push("/")
    }

    return (
        <div >
            <div >
                <h1
                    className="modal-title"
                >Delete an Ingredient</h1>
                <div>Are you sure you want to delete your Ingredient {ingredient.name}?</div>
            </div>
            <div>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={deleter} type="submit">Delete Ingredient</button>
            </div>
        </div >
    )
}

export default DeleteIngredientModal

import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import { deleteIngredientThunk } from "../../../store/ingredients"
import 'bulma/css/bulma.css';


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
        <div className="modal-background">
            <div className="modal-form">
                <div >
                    <h1
                        className="modal-title"
                    >Delete an Ingredient</h1>
                    <div className="wrap-break">Are you sure you want to delete your Ingredient {ingredient.name}?</div>
                </div>
                <div className="modal-buttons">
                    <button className="button is-success is-rounded is-small" onClick={closeModal}>Cancel</button>
                    <button className="button is-danger is-rounded is-small" onClick={deleter} type="submit">Delete Ingredient</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteIngredientModal

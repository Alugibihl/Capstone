import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import { deleteRecipeThunk } from "../../../store/recipes"

const DeleteRecipeModal = ({ recipe }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const deleter = async () => {
        await dispatch(deleteRecipeThunk(recipe.id))
        closeModal()
        history.push("/")
    }

    return (
        <div className="modal-background">
            <div className="modal-form">
                <div className="form-data">
                    <h1 className="modal-title">Delete a Recipe</h1>
                    <div>Are you sure you want to delete your recipe for {recipe.name}?</div>
                </div>
                <div className="modal-buttons">
                    <button className="green-button" onClick={closeModal}>Cancel</button>
                    <button className="red-button" onClick={deleter} type="submit">Delete Recipe</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteRecipeModal

import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import { deleteRecipeThunk } from "../../../store/recipes"
import 'bulma/css/bulma.css';

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
                    <div className="wrap-break">Are you sure you want to delete your recipe for {recipe.name}?</div>
                </div>
                <div className="modal-buttons">
                    <button className="button is-success is-rounded is-small" onClick={closeModal}>Cancel</button>
                    <button className="button is-danger is-rounded is-small" onClick={deleter} type="submit">Delete Recipe</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteRecipeModal

import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteIngredientThunk } from "../../../store/ingredients"
import { useState } from "react";
import 'bulma/css/bulma.css';

const DeleteIngredientModal = ({ ingredient }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ingredientId = ingredient.id
    const [isActive, setIsActive] = useState(false);

    const deleter = async () => {
        await dispatch(deleteIngredientThunk(ingredientId))
        setIsActive(false)
        history.push("/")
    }
    const openModal = () => {
        setIsActive(true);
    };
    const closeMenu = () => {
        setIsActive(false);
    };

    return (
        <div>
            <button className="button is-danger is-rounded is-small" onClick={openModal}>
                Delete this ingredient
            </button>

            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeMenu}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete an Ingredient</p>
                        <button className="delete" aria-label="close" onClick={closeMenu}></button>
                    </header>
                    <section className="modal-card-body">
                        <div>Are you sure you want to delete your ingredient for {ingredient.name}?</div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success is-rounded is-small" onClick={closeMenu}>Cancel</button>
                        <button className="button is-danger is-rounded is-small" onClick={deleter} type="submit">Delete Ingredient</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default DeleteIngredientModal

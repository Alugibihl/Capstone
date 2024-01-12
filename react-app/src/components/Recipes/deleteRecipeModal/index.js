import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRecipeThunk } from "../../../store/recipes";
import { useState } from "react";
import 'bulma/css/bulma.css';

const DeleteRecipeModal = ({ recipe }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const deleter = async () => {
        await dispatch(deleteRecipeThunk(recipe.id));
        setIsActive(false);
        history.push("/");
    };
    const openModal = () => {
        setIsActive(true);
    };
    const closeMenu = () => {
        setIsActive(false);
    };

    return (
        <div>
            <button className="button is-danger is-rounded is-small" onClick={openModal}>
                Delete this recipe
            </button>

            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeMenu}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete a Recipe</p>
                        <button className="delete" aria-label="close" onClick={closeMenu}></button>
                    </header>
                    <section className="modal-card-body">
                        <div>Are you sure you want to delete your recipe for {recipe.name}?</div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success is-rounded is-small" onClick={closeMenu}>Cancel</button>
                        <button className="button is-danger is-rounded is-small" onClick={deleter} type="submit">Delete Recipe</button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default DeleteRecipeModal;

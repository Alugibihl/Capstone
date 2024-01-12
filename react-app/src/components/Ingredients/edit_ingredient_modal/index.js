import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOneIngredientThunk, getOneIngredientThunk } from "../../../store/ingredients";
import 'bulma/css/bulma.css';

const EditIngredientModal = ({ ingredient }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const [details, setDetails] = useState(ingredient.details)
    const [image, setImage] = useState(ingredient.image)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(ingredient.name)
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        dispatch(getOneIngredientThunk(ingredient.id))
    }, [dispatch, ingredient])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.trim().length >= 10) {
            if (name.trim().length < 3 || name.trim().length > 40) {
                setErrors([
                    "Ingredient's name must be between 3 and 40 characters.",
                ]);
            } else {
                const formData = new FormData();
                formData.append("details", details)
                formData.append("name", name)
                formData.append("user_id", currentUser.id)
                formData.append("image", image);
                const info = { formData, ingredient }
                const data = await dispatch(editOneIngredientThunk(info));
                if (data) {
                    setIsActive(false)
                    dispatch(getOneIngredientThunk(ingredient.id))
                }
            }
        } else {
            setErrors([
                "Ingredient Description must be at least 10 characters.",
            ]);
        }
    };

    const closeMenu = () => {
        setIsActive(false);
    };

    return (
        <div>
            <button className="button is-success is-rounded is-small" onClick={() => setIsActive(true)}>
                Edit this Ingredient
            </button>
            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeMenu}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit an Ingredient</p>
                        <button className="delete" aria-label="close" onClick={closeMenu}></button>
                    </header>
                    <section className="modal-card-body">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="form-styling"
                        >
                            <div className="modal-error-container">
                                {errors.map((error, idx) => (
                                    <div key={idx} className="modal-errors">{error}</div>
                                ))}
                            </div>
                            <div className="form-data">
                                <label>
                                    Edit your Ingredient description and its uses
                                    <br />
                                    <textarea
                                        className="container"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        placeholder={`Please share an ingredient you love.`}
                                        required
                                    />
                                </label>
                                <label>
                                    <br />
                                    Place a picture of your ingredient here!
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </label>
                                <label>
                                    <br />
                                    Edit the name of your dish.
                                    <br />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Ingredient"
                                    />
                                </label>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger is-rounded is-small" onClick={closeMenu}>Cancel</button>
                        <button className="button is-success is-rounded is-small" type="submit" onClick={handleSubmit}>Edit Ingredient</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default EditIngredientModal;

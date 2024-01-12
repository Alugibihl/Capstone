import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createIngredientThunk } from "../../../store/ingredients";
import '../../../index.css'
import 'bulma/css/bulma.css';

const CreateIngredientModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [details, setDetails] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState("")
    const currentUser = useSelector((state) => state.session.user)
    const [isActive, setIsActive] = useState(false);

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

                const data = await dispatch(createIngredientThunk(formData));
                if (data) {
                    setIsActive(false);
                    history.push(`/ingredients/${data.ingredient.id}`)
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
            <div>
                <button className='button is-success is-rounded is-small'
                    onClick={() => setIsActive(!isActive)}>
                    Create a New Ingredient!</button>
            </div>
            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeMenu}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add an Ingredient</p>
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
                                <label style={{ color: "black" }}>
                                    Describe your Ingredient and its uses
                                    <br />
                                    <textarea
                                        className="container"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        placeholder={`Please share an Ingredient you love.`}
                                        required
                                    />
                                </label>
                                <br />
                                <label style={{ color: "black" }}>
                                    Place a picture of your Ingredient here!
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        required
                                    />
                                </label>
                                <label style={{ color: "black" }}>
                                    <br />
                                    Enter the name of your Ingredient.
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
                            <div className="navbar-divider"></div>
                            <div className="buttons">
                                <button className="button is-danger is-rounded is-small" onClick={closeMenu}>Cancel</button>
                                <button className="button is-success is-rounded is-small" type="submit">Create Ingredient</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CreateIngredientModal;

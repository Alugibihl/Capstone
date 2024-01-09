import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createIngredientThunk } from "../../../store/ingredients";
import 'bulma/css/bulma.css';

const CreateIngredientModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [details, setDetails] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState("")
    const currentUser = useSelector((state) => state.session.user)
    const { closeModal } = useModal()


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
                    closeModal();
                    history.push(`/ingredients/${data.ingredient.id}`)
                }
            }
        } else {
            setErrors([
                "Ingredient Description must be at least 10 characters.",
            ]);

        }

    };
    return (
        <div className="modal-background">
            <div className="modal-form">
                <div >
                    <h1
                        className="modal-title"
                    > Add an Ingredient</h1 >
                </div >
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-styling"
                >
                    <div
                        className="modal-error-container"
                    >
                        {errors.map((error, idx) => (
                            <div
                                key={idx}
                                className="modal-errors"
                            >{error}</div>
                        ))}
                    </div>
                    <div className="form-data">
                        <label>
                            Describe your Ingredient and its uses
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder={`Please share an Ingredient you love.`}
                                required
                            />
                        </label>
                        <label>
                            Place a picture of your Ingredient here!
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </label>
                        <label>
                            Enter the name of your Ingredient.
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Ingredient"
                            />
                        </label>
                    </div>
                    <div className="modal-buttons">
                        <button className="button is-danger is-rounded is-small" onClick={closeModal}>Cancel</button>
                        <button className="button is-success is-rounded is-small" type="submit">Create Ingredient</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateIngredientModal

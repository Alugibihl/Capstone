import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editOneIngredientThunk, getOneIngredientThunk } from "../../../store/ingredients";

const EditIngredientModal = ({ ingredient }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const [details, setDetails] = useState(ingredient.details)
    const [image, setImage] = useState(ingredient.image)
    // const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(ingredient.name)
    const { closeModal } = useModal()

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
                    closeModal();
                    dispatch(getOneIngredientThunk(ingredient.id))
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
                    >Edit an Ingredient</h1>
                </div>
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
                            Edit your Ingredient description and it's uses
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder={`Please share a ingredient you love.`}
                                required
                            />
                        </label>
                        <label>
                            Place a picture of your ingredient here!
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                        <label>
                            Edit the name of your dish.
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
                        <button className="red-button" onClick={closeModal}>Cancel</button>
                        <button className="green-button" type="submit">Edit Ingredient</button>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default EditIngredientModal

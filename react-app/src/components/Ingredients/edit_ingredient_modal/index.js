import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editOneIngredientThunk, getAllIngredientsThunk, getOneIngredientThunk } from "../../../store/ingredients";

const EditIngredientModal = ({ ingredient }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const [details, setDetails] = useState(ingredient.details)
    const [image, setImage] = useState(ingredient.image)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(ingredient.name)
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllIngredientsThunk())
        dispatch(getOneIngredientThunk(ingredient.id))
    }, [dispatch, ingredient])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.length >= 10) {
            const item = {
                'details': details,
                'name': name,
                'user_id': currentUser.id,
                'image': image,
            }
            const info = { item, ingredient }
            const data = await dispatch(editOneIngredientThunk(info));
            if (data) {
                console.log("data---", data.ingredient);
                closeModal();
                dispatch(getOneIngredientThunk(data.ingredient.id))
            }
        } else {
            setErrors([
                "Ingredient must be at least 10 characters.",
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
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder={`Please share a ingredient you love.`}
                            required
                        />
                        <label>
                            Place a picture of your ingredient here!
                            <input
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="url"
                                required
                            />
                        </label>
                        <label>
                            Please Enter the name of your dish.
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
                        <button className="green-button" type="submit">Edit Recipe</button>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default EditIngredientModal

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editOneRecipeThunk, getAllRecipesThunk, getOneRecipeThunk } from "../../../store/recipes";
import { editOneIngredientThunk } from "../../../store/ingredients";

const EditIngredientModal = ({ ingredient }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const [details, setDetails] = useState(ingredient.details)
    const [image, setImage] = useState(ingredient.image)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(ingredient.name)
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllRecipesThunk())
        dispatch(getOneRecipeThunk(ingredient.id))
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
                closeModal();
                dispatch(getOneRecipeThunk(ingredient.id))
            }
        } else {
            setErrors([
                "Ingredient must be at least 10 characters.",
            ]);
        }
    };
    return (
        <div >
            <div >
                <h1
                    className="modal-title"
                >Edit a Recipe</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="modal-space-form"
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
                <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Edit Recipe</button>
                </div>
            </form >
        </div >
    )
}

export default EditIngredientModal

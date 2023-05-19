import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editOneRecipeThunk, getAllRecipesThunk, getOneRecipeThunk } from "../../../store/recipes";

const EditRecipeModal = ({ recipe }) => {
    const dispatch = useDispatch()
    const choices = useSelector((state) => state.recipes.recipes.categories)
    const currentUser = useSelector((state) => state.session.user)
    const [details, setDetails] = useState(recipe.details)
    const [image, setImage] = useState(recipe.image)
    const [errors, setErrors] = useState([])
    const [categoryId, setCategoryId] = useState(recipe.categoryId)
    const [name, setName] = useState(recipe.name)
    console.log("---------------here", choices, currentUser); // choices is an array of backend options
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllRecipesThunk())
        dispatch(getOneRecipeThunk(recipe.id))
    }, [dispatch, recipe])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.length >= 20) {
            const item = {
                'details': details,
                'name': name,
                'user_id': currentUser.id,
                'image': image,
                'category_id': categoryId,
            }
            const info = { item, recipe }
            const data = await dispatch(editOneRecipeThunk(info));
            if (data) {
                closeModal();
                dispatch(getOneRecipeThunk(recipe.id))
            }
        } else {
            setErrors([
                "Recipe must be at least 20 characters.",
            ]);
        }
    };
    return (
        <div className="modal-background">
            <div className="modal-form">
                <div >
                    <h1
                        className="modal-title"
                    >Edit a Recipe</h1>
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
                            placeholder={`Please share a recipe you love.`}
                            required
                        />
                        <label>
                            Place a picture of your recipe here!
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
                                placeholder="Bone Soup"
                            />
                        </label>
                        <label className="category">
                            Please Specify your cuisine classification
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <option>Select One</option>
                                {choices?.map((choice) => (
                                    <option key={choice.id} value={choice.id}>{choice.name}</option>
                                ))}
                            </select>
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

export default EditRecipeModal

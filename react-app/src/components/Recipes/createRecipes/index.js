import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createRecipeThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";

const CreateRecipeModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const choicesArr = useSelector(state => state.categories.categories.category)
    const [details, setDetails] = useState("")
    const [image, setImage] = useState(null)
    // const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [name, setName] = useState("")
    const currentUser = useSelector((state) => state.session.user)
    const { closeModal } = useModal()
    // console.log("choices list", choicesArr);

    useEffect(() => {
        dispatch(getAllCategoriesThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.trim().length >= 20) {
            if (name.trim().length < 3 || name.trim().length > 40) {
                setErrors([
                    "Recipe name must be between 3 and 40 characters.",
                ]);
            } else {
                const formData = new FormData()
                formData.append("details", details)
                formData.append("name", name)
                formData.append("user_id", currentUser.id)
                formData.append("image", image)
                formData.append("category_id", categoryId)
                const data = await dispatch(createRecipeThunk(formData));
                if (data) {
                    closeModal();
                    // console.log("---- data---", data);
                    history.push(`/recipes/${data.recipe.id}`)
                }
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
                        className="modal-title "
                    >Add a Recipe</h1>
                </div>
                <form
                    className="form-styling"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <div className="modal-error-container">
                        {errors.map((error, idx) => (
                            <div
                                key={idx}
                                className="modal-errors"
                            >{error}</div>
                        ))}
                    </div>
                    <div className="form-data">
                        <label>
                            Describe or fill out your recipe
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder={`Please share a recipe you love.`}
                                required
                            />
                        </label>
                        <label>
                            Place a picture of your recipe here!
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </label>
                        <label>
                            Enter the name of your dish.
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Bone Soup"
                            />
                        </label>
                        <label className="category">Specify your cuisine classification
                            <br />
                            <select
                                value={categoryId}
                                id="cuisine"
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <option>Select One</option>
                                {choicesArr?.map((choice) => (
                                    <option key={choice.id} value={choice.id}>{choice.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="modal-buttons">
                        <button className="red-button" onClick={closeModal}>Cancel</button>
                        <button className="green-button" type="submit">Create Recipe</button>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default CreateRecipeModal

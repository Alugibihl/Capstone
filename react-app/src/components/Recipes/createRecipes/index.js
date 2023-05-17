import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createRecipeThunk, getAllRecipesThunk } from "../../../store/recipes";

const CreateRecipeModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const choices = useSelector((state) => state.recipes.recipes.categories)
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])
    const [category_id, setCategory_id] = useState("")
    const [name, setName] = useState("")
    const [categoryChoices, setCategoryChoices] = useState(choices ? choices : "");
    const currentUser = useSelector((state) => state.session.user)
    console.log("---------------here", choices, currentUser); // choices is an array of backend options
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllRecipesThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.length >= 20) {
            const item = {
                'details': details,
                'name': name,
                'user_id': currentUser.id,
                'image': image,
                'category_id': category_id,
            }
            const data = await dispatch(createRecipeThunk(item));
            // console.log('------------------------------data', data);
            if (data) {
                closeModal();
                history.push(`/recipes/${data.recipe.id}`)
            }
        } else {
            setErrors([
                "Recipe must be at least 20 characters.",
            ]);
        }
    };
    return (
        <div className="modal-space-container">
            <div className="modal-space-top">
                <h1
                    className="modal-title"
                >Add a Recipe</h1>
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
                        placeholder={`Please share a recipe you love.`}
                    />
                    <label className="email">
                        Place a picture of your recipe here!
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="url"
                            required
                        />
                    </label>
                    <label className="password">
                        Please Enter the name of your dish.
                        <input
                            type="test"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Bone Soup"
                        />
                    </label>
                    <label className="category">
                        Please Specify your cuisine classification
                        <select
                            value={category_id}
                            onChange={(e) => setCategory_id(e.target.value)}
                            required
                        >
                            <option >Select One</option>
                            {categoryChoices.map = (choice) => (
                                <option key={choice.id} value={choice.name}></option>
                            )}
                        </select>
                    </label>

                </div>
                <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Create Recipe</button>
                </div>
            </form >
        </div >
    )
}

export default CreateRecipeModal

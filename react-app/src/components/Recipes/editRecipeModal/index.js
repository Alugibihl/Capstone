import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editOneRecipeThunk, getOneRecipeThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";
import { getAllIngredientsThunk } from "../../../store/ingredients";
import { MultiSelect } from "react-multi-select-component"

const EditRecipeModal = ({ recipe }) => {
    const dispatch = useDispatch()
    const choices = useSelector((state) => state.categories.categories.category)
    const currentUser = useSelector((state) => state.session.user)
    const [details, setDetails] = useState(recipe.details)
    const [image, setImage] = useState(recipe.image)
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredient)
    const [errors, setErrors] = useState([])
    const [categoryId, setCategoryId] = useState(recipe.categoryId)
    const [name, setName] = useState(recipe.name)
    const { closeModal } = useModal()
    const starter = recipe?.relations.map((ingred) => {
        return { value: ingred.id, label: ingred.name }
    })
    const [selectedIngredients, setSelectedIngredients] = useState(recipe?.relations ? starter : []);
    console.log("this is recipe", recipe, selectedIngredients);

    useEffect(() => {
        dispatch(getAllCategoriesThunk())
        dispatch(getOneRecipeThunk(recipe.id))
        dispatch(getAllIngredientsThunk())
    }, [dispatch, recipe])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.trim().length >= 20) {
            if (name.trim().length < 3 || name.trim().length > 40) {
                setErrors([
                    "Recipe name must be between 3 and 40 characters.",
                ]);
            }
            else if (!categoryId) {
                setErrors([
                    "Recipe Genre must be provided.",
                ]);
            }
            else {
                let vals = selectedIngredients?.map((ingreds) => ingreds.value)
                console.log("vals", vals);
                const formData = new FormData()
                formData.append("details", details)
                formData.append("name", name)
                formData.append("user_id", currentUser.id)
                formData.append("image", image)
                formData.append("category_id", categoryId)
                formData.append("relates", vals);
                const info = { formData, recipe }
                const data = await dispatch(editOneRecipeThunk(info));
                if (data.errors) {
                    console.log("error", data);
                    setErrors([
                        data.errors
                    ]);
                }
                else if (data) {
                    closeModal();
                    dispatch(getOneRecipeThunk(recipe.id))
                }
            }
        } else {
            setErrors([
                "Recipe must be at least 20 characters.",
            ]);
        }
    };

    if (!ingredients) return null
    if (!recipe) return null

    const handleChange = (selected) => {
        console.log("selected", selected);
        setSelectedIngredients(selected);
    };

    const options = ingredients?.map((ingredient) => ({
        value: ingredient.id,
        label: ingredient.name,
    }));


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
                    method="PUT"
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
                    <div className="modal-org">
                        <div className="form-data">
                            <label>
                                Edit your recipe or its description
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
                                />
                            </label>
                            <label>
                                Edit the name of your dish.
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Bone Soup"
                                />
                            </label>
                            <label className="category">Update your cuisine classification</label>
                            <br />
                            <select
                                id="cuisine"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <option>Select One</option>
                                {choices?.map((choice) => (
                                    <option key={choice.id} value={choice.id}>{choice.name}</option>
                                ))}
                            </select>

                        </div>
                        <div className="selector-ingreds">
                            <label>Select ingredients:</label>
                            <br />
                            <MultiSelect
                                selectionLimit={1}
                                options={options}
                                value={selectedIngredients}
                                onChange={handleChange}
                                labelledBy="Select"
                                hasSelectAll={false}
                                multiple
                            />
                        </div>

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

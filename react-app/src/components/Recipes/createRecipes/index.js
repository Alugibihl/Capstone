import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";
import { getAllIngredientsThunk } from "../../../store/ingredients";
import { MultiSelect } from "react-multi-select-component";
import 'bulma/css/bulma.css';

const CreateRecipeModal = () => {
    const dispatch = useDispatch();
    const choices = useSelector((state) => state.categories.categories.category);
    const currentUser = useSelector((state) => state.session.user);
    const ingredients = useSelector(state => state.ingredients?.ingredients?.ingredients);
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        dispatch(getAllCategoriesThunk());
        dispatch(getAllIngredientsThunk());
    }, [dispatch]);

    const closeMenu = () => {
        setIsActive(false);
    };

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
                const formData = new FormData()
                formData.append("details", details)
                formData.append("name", name)
                formData.append("user_id", currentUser.id)
                formData.append("image", image)
                formData.append("category_id", categoryId)
                formData.append("ingredient_ids", vals)
                const data = await dispatch(createRecipeThunk(formData));
                if (data.errors) {
                    setErrors([
                        data.errors
                    ]);
                }
                else if (data) {
                    setIsActive(false)
                }
            }
        } else {
            setErrors([
                "Recipe must be at least 20 characters.",
            ]);
        }
    };

    const handleChange = (selected) => {
        setSelectedIngredients(selected);
    };

    const options = ingredients?.map((ingredient) => ({
        value: ingredient.id,
        label: ingredient.name,
    }));

    if (!ingredients) return null;
    if (!choices) return null;

    return (
        <div>
            <button className="button is-success is-rounded is-small" onClick={() => setIsActive(true)}>
                Create a New Recipe!
            </button>
            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeMenu}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add a Recipe</p>
                        <button className="delete" aria-label="close" onClick={closeMenu}></button>
                    </header>
                    <section className="modal-card-body">
                        <form
                            onSubmit={handleSubmit}
                            method="POST"
                            encType="multipart/form-data"
                            className="form-styling"
                        >
                            <div className="modal-error-container">
                                {errors.map((error, idx) => (
                                    <div key={idx} className="modal-errors">{error}</div>
                                ))}
                            </div>
                            <div className="modal-org">
                                <div className="form-data">
                                    <label style={{ color: "black" }}>
                                        Describe your recipe or its details
                                        <br />
                                        <textarea
                                            className="container"
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder={`Please share a recipe you love.`}
                                            required
                                        />
                                    </label>
                                    <label style={{ color: "black" }}>
                                        <br />
                                        Place a picture of your recipe here!
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
                                        Enter the name of your dish.
                                        <br />
                                        <input
                                            className="container"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Bone Soup"
                                        />
                                    </label>
                                    <br />
                                    <label style={{ color: "black" }}>
                                        Specify your cuisine classification
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
                                    </label>
                                </div>
                                <br />
                                <div>
                                    <label style={{ color: "black" }}>Select ingredients:
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
                                    </label>
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger is-rounded is-small" onClick={closeMenu}>Cancel</button>
                        <button className="button is-success is-rounded is-small" type="submit" onClick={handleSubmit}>Create Recipe</button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipeModal;

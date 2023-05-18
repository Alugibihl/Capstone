import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createIngredientThunk, getAllIngredientsThunk } from "../../../store/ingredients";

const CreateIngredientModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])
    const [name, setName] = useState("")
    const currentUser = useSelector((state) => state.session.user)
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllIngredientsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.length >= 10) {
            const item = {
                'details': details,
                'name': name,
                'user_id': currentUser.id,
                'image': image,
            }
            const data = await dispatch(createIngredientThunk(item));
            if (data) {
                console.log("data-----response---", data);
                closeModal();
                // history.push(`/ingredients/${data.ingredient.id}`)
            }
        } else {
            setErrors([
                "Ingredients must be at least 10 characters.",
            ]);
        }
    };
    return (
        <div >
            <div >
                <h1
                    className="modal-title"
                >Add an Ingredient</h1>
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
                        placeholder={`Please share an Ingredient you love.`}
                        required
                    />
                    <label>
                        Place a picture of your Ingredient here!
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="url"
                            required
                        />
                    </label>
                    <label>
                        Please Enter the name of your Ingredient.
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
                    <button type="submit">Create Ingredient</button>
                </div>
            </form >
        </div >
    )
}

export default CreateIngredientModal

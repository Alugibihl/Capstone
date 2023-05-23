import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createIngredientThunk, getAllIngredientsThunk, getOneIngredientThunk } from "../../../store/ingredients";

const CreateIngredientModal = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const [details, setDetails] = useState("")
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState("")
    const currentUser = useSelector((state) => state.session.user)
    const { closeModal } = useModal()


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.length >= 10) {
            const formData = new FormData();
            formData.append("details", details)
            formData.append("name", name)
            formData.append("user_id", currentUser.id)
            formData.append("image", image);
            setImageLoading(true);

            // const item = {
            //     'details': details,
            //     'name': name,
            //     'user_id': currentUser.id,
            //     'image': image,
            // }
            const data = await dispatch(createIngredientThunk(formData));
            if (data) {
                closeModal();
                history.push(`/ingredients/${data.ingredient.id}`)
            }
        } else {
            setErrors([
                "Ingredients must be at least 10 characters.",
            ]);

        }
        // const res = await fetch('/api/images', {
        //     method: "POST",
        //     body: formData,
        // });
        // if (res.ok) {
        //     await res.json();
        //     setImageLoading(false);
        //     history.push("/images");
        // }
        // else {
        //     setImageLoading(false);
        //     // a real app would probably use more advanced
        //     // error handling
        //     console.log("error");
        // }
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
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder={`Please share an Ingredient you love.`}
                            required
                        />
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
                    <div className="modal-buttons">
                        <button className="red-button" onClick={closeModal}>Cancel</button>
                        <button className="green-button" type="submit">Create Ingredient</button>
                    </div>
                    {(imageLoading) && <p>Loading...</p>}
                </form >
            </div>
        </div >
    )
}

export default CreateIngredientModal

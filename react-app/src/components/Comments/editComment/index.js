import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editOneCommentThunk, getAllCommentsThunk, getCommentsByRecipe } from "../../../store/comments"


const EditCommentForm = ({ comment, recipe }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([])
    const [details, setDetails] = useState(comment.details)
    // const comments = useSelector(state => state.comments.comments.comment)
    console.log("------- recipe", recipe, comment);

    // useEffect(() => {
    //     dispatch(getCommentsByRecipe())
    // }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.trim().length >= 3 && details.trim().length <= 500) {
            const info = {
                "details": details,
                "user_id": currentUser.id,
                "recipe_id": recipe.id
            }
            const data = { info, comment }
            setDetails("")
            setErrors([])
            await dispatch(editOneCommentThunk(data))
            await dispatch(getAllCommentsThunk(recipe.id))
        } else {
            setErrors([
                "Comments must be between 3 and 500 characters.",
            ]);
        }
    };

    return (
        <div >
            <div>
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
                            Edit your comment Below
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder={"Add Comment..."}
                                required
                            />
                        </label>
                    </div>
                    <div className="modal-buttons">
                        <button className="red-button" onClick={() => setDetails("")}>Clear</button>
                        <button className="green-button" type="submit">Edit Comment</button>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default EditCommentForm

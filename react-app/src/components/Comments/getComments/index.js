import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCommentsThunk } from "../../../store/comments"
import OneComment from "../oneComment"

const CommentsByRecipe = ({ recipe }) => {
    const dispatch = useDispatch()
    const recipeComments = useSelector(state => state.comments.comments.comment)
    const allUsers = useSelector(state => state.comments.comments.user)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllCommentsThunk(recipe.id))
    }, [dispatch, recipe])

    if (!recipeComments) return null
    if (!allUsers) return null
    return (
        <div>
            <h1>Comments {recipeComments.length}</h1>
            <h2>Please keep your comments respectful</h2>
            <div>

            </div>
            <div>
                {recipeComments.map((comment) => {
                    return <div key={comment.id}>
                        <OneComment comment={comment} allUsers={allUsers} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default CommentsByRecipe

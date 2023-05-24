// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getAllCommentsThunk } from "../../../store/comments"
// import OneComment from "../oneComment"
// import CreateCommentForm from "../addComment"
// import EditCommentForm from "../editComment"

// const CommentsByRecipe = ({ recipe }) => {
//     const dispatch = useDispatch()
//     const recipeComments = useSelector(state => state.comments.comments.comment)
//     const allUsers = useSelector(state => state.comments.comments.user)
//     const user = useSelector(state => state.session.user)
//     const [editFormStatus, setEditFormStatus] = useState(false)
//     const [editVisible, setEditVisible] = useState(false)
//     const [comments, setComments] = useState("")
//     // const sessionUser = useSelector(state => state.session.user)

//     useEffect(() => {
//         dispatch(getAllCommentsThunk(recipe.id))
//     }, [dispatch, recipe])

//     const editVisibility = () => {
//         setEditFormStatus(!editFormStatus)
//         setEditVisible(!editVisible)
//         return
//     }

//     if (!recipeComments) return null
//     if (!allUsers) return null
//     return (
//         <div className="comments-modal-container wrap-break">
//             <div className="comments-modal-text">
//                 <h1>Comments {recipeComments.length}</h1>
//                 <h2>Please keep your comments respectful</h2>
//                 {!editFormStatus && <div>
//                     <CreateCommentForm recipe={recipe} />
//                 </div>}
//                 <div>
//                     {recipeComments.map((comment) => {
//                         return <div className="comments-arr" key={comment.id}>
//                             <OneComment comment={comment} recipe={recipe} allUsers={allUsers} />
//                             {user.id === comment.userId && < div >
//                                 <div>
//                                     {editVisible && <button className="red-button" onClick={editVisibility}>Cancel Edit</button>}
//                                     {!editVisible && <button className="green-button" onClick={editVisibility}>Edit Comment</button>}
//                                 </div>
//                                 {editFormStatus && <div>
//                                     <EditCommentForm comment={comment} recipe={recipe} />
//                                 </div>}
//                             </div>
//                             }
//                         </div>
//                     })}
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default CommentsByRecipe
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCommentsThunk } from "../../../store/comments"
import OneComment from "../oneComment"
import CreateCommentForm from "../addComment"
import EditCommentForm from "../editComment"

const CommentsByRecipe = ({ recipe }) => {
    const dispatch = useDispatch()
    const recipeComments = useSelector(state => state.comments.comments.comment)
    const allUsers = useSelector(state => state.comments.comments.user)
    const user = useSelector(state => state.session.user)
    const [editFormStatus, setEditFormStatus] = useState({})
    const [selectedCommentId, setSelectedCommentId] = useState(null)
    const [comments, setComments] = useState("")
    const [deleteVisible, setDeleteVisible] = useState(false)

    useEffect(() => {
        dispatch(getAllCommentsThunk(recipe.id))
    }, [dispatch, recipe])

    const editVisibility = (commentId) => {
        setEditFormStatus(prevStatus => ({
            ...prevStatus,
            [commentId]: !prevStatus[commentId]
        }))
        setSelectedCommentId(commentId)
        setDeleteVisible(false)
    }

    if (!recipeComments) return null
    if (!allUsers) return null
    return (
        <div className="comments-modal-container wrap-break">
            <div className="comments-modal-text">
                <h1>Comments {recipeComments.length}</h1>
                <h2>Please keep your comments respectful</h2>
                {!editFormStatus[selectedCommentId] && (
                    <div>
                        <CreateCommentForm recipe={recipe} />
                    </div>
                )}
                <div>
                    {recipeComments.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <OneComment
                                    comment={comment}
                                    recipe={recipe}
                                    allUsers={allUsers}
                                    editVisibility={editVisibility}
                                    deleteVisible={deleteVisible}
                                    setDeleteVisible={setDeleteVisible}
                                />
                                {user.id === comment.userId && (
                                    <div>
                                        <div>
                                            {editFormStatus[comment.id] && (
                                                <div>
                                                    <EditCommentForm comment={comment} recipe={recipe} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentsByRecipe

// import { useDispatch, useSelector } from "react-redux"
// import { useState } from "react"
// import { deleteCommentThunk, getAllCommentsThunk } from "../../../store/comments"



// const OneComment = ({ comment, recipe, allUsers }) => {
//     const dispatch = useDispatch()
//     const user = allUsers.find(user => user.id === comment.userId)
//     const sessionUser = useSelector(state => state.session.user)
//     const [visible, setVisible] = useState(false)
//     console.log("users", user, sessionUser);


//     const deleter = async () => {
//         await dispatch(deleteCommentThunk(comment.id))
//         await dispatch(getAllCommentsThunk(recipe.id))
//     }

//     if (!user) return null
//     if (!sessionUser) return null
//     return (
//         <div>
//             <div>Posted by: {user.username}</div>
//             <div>
//                 {comment.details}
//             </div>
//             {sessionUser.id === user.id &&
//                 <div>

//                     <div>
//                         <button className={visible ? "hidden" : "red-button"} onClick={() => setVisible(true)}>
//                             Delete Comment
//                         </button>
//                         <div className={visible ? "" : "hidden"}>
//                             <div className="form-data">
//                                 <div>Are you sure you want to delete your comment?</div>
//                             </div>
//                             <div className="modal-buttons">
//                                 <button className="green-button" onClick={() => setVisible(false)}>Cancel Deletion</button>
//                                 <button className="red-button" onClick={deleter} type="submit">Delete Comment</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div >
//     )
// }

// export default OneComment
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { deleteCommentThunk, getAllCommentsThunk } from "../../../store/comments"

const OneComment = ({ comment, recipe, allUsers, editVisibility, deleteVisible, setDeleteVisible }) => {
    const dispatch = useDispatch()
    const user = allUsers.find(user => user.id === comment.userId)
    const sessionUser = useSelector(state => state.session.user)
    const [visible, setVisible] = useState(false)

    const deleter = async () => {
        await dispatch(deleteCommentThunk(comment.id))
        await dispatch(getAllCommentsThunk(recipe.id))
    }

    if (!user) return null
    if (!sessionUser) return null
    return (
        <div>
            <div>Posted by: {user.username}</div>
            <div>{comment.details}</div>
            {sessionUser.id === user.id && (
                <div>
                    {!visible && !deleteVisible && (
                        <button className="red-button" onClick={() => setVisible(true)}>
                            Delete Comment
                        </button>
                    )}
                    {visible && (
                        <div>
                            <div className="form-data">
                                <div>Are you sure you want to delete your comment?</div>
                            </div>
                            <div className="modal-buttons">
                                <button className="green-button" onClick={() => setVisible(false)}>
                                    Cancel Deletion
                                </button>
                                <button className="red-button" onClick={deleter} type="submit">
                                    Delete Comment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {sessionUser.id === comment.userId && (
                <div>
                    {!visible && !editVisibility[comment.id] && (
                        <div>
                            <button className="green-button" onClick={() => {
                                editVisibility(comment.id)
                                setDeleteVisible(false)
                            }}>
                                Edit Comment
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default OneComment

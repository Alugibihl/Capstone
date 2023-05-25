import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { deleteCommentThunk, getAllCommentsThunk } from "../../../store/comments"

const OneComment = ({ comment, recipe, allUsers, editVisibility, deleteVisible, setDeleteVisible, editFormStatus }) => {
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
        <div className="comments-arr">
            <div className="posted-by">Posted by: <h4>{user.username}</h4></div>
            <div>{comment.details}</div>
            <div className="modal-buttons">
                {sessionUser.id === user.id && (
                    <div>
                        {!editFormStatus[comment.id] && !visible && !deleteVisible && (
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
                            <div className={!editFormStatus[comment.id] ? "" : "single-button"}>
                                <button className={!editFormStatus[comment.id] ? "green-button" : "red-button long-button"} onClick={() => {
                                    editVisibility(comment.id)
                                    setDeleteVisible(false)
                                }}>
                                    {!editFormStatus[comment.id] ? "Edit Comment" : "Cancel Edit"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OneComment

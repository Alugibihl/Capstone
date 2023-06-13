import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCommentsThunk } from "../../../store/comments"
import OneComment from "../oneComment"
import CreateCommentForm from "../addComment"
import EditCommentForm from "../editComment"
import { useModal } from "../../../context/Modal"

const CommentsByRecipe = ({ recipe }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const recipeComments = useSelector(state => state.comments.comments.comment)
    const allUsers = useSelector(state => state.comments.comments.user)
    const user = useSelector(state => state.session.user)
    const [editFormStatus, setEditFormStatus] = useState({})
    const [selectedCommentId, setSelectedCommentId] = useState(null)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllCommentsThunk(recipe.id))
        setIsOpen(true)
    }, [dispatch, recipe])

    const editVisibility = (commentId) => {
        const currentStatus = { ...editFormStatus };
        if (currentStatus[commentId]) {
            currentStatus[commentId] = false;
        } else {
            currentStatus[commentId] = true;
        }
        setEditFormStatus(currentStatus);
        setSelectedCommentId(commentId);
        setDeleteVisible(false);
        // console.log("statuses", editFormStatus, deleteVisible);
    };

    if (!recipeComments) return null
    if (!allUsers) return null
    return (
        <div className={`comments-modal-container wrap-break ${isOpen ? "slider" : ""}`}>
            <div className="border-base-comments">
                <div className="comments-modal-text">
                    <div className="comment-page-title">
                        <h1>Comments {recipeComments.length}</h1>
                        <button onClick={closeModal}> X </button>
                    </div>
                    <h2>Please keep your comments respectful</h2>
                    {!editFormStatus[selectedCommentId] ? (
                        <div>
                            <CreateCommentForm recipe={recipe} />
                        </div>
                    ) : (<div className="filler-space"> </div>)}

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
                                        editFormStatus={editFormStatus}
                                    />
                                    {user.id === comment.userId && (
                                        <div>
                                            <div>
                                                {editFormStatus[comment.id] && (
                                                    <div>
                                                        <EditCommentForm comment={comment} recipe={recipe} setEditFormStatus={setEditFormStatus} editFormStatus={editFormStatus} />
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
        </div>
    )
}

export default CommentsByRecipe

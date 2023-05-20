import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import { deleteCommentThunk } from "../../../store/comments"



const DeleteCommentModal = ({ comment }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const deleter = async () => {
        await dispatch(deleteCommentThunk(comment.id))
        closeModal()
        history.push("/")
    }

    return (
        <div className="modal-background">
            <div className="modal-form">
                <div className="form-data">
                    <h1 className="modal-title">Delete a Comment</h1>
                    <div>Are you sure you want to delete your comment?</div>
                </div>
                <div className="modal-buttons">
                    <button className="green-button" onClick={closeModal}>Cancel</button>
                    <button className="red-button" onClick={deleter} type="submit">Delete Comment</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteCommentModal

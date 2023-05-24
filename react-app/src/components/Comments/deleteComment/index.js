import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { deleteCommentThunk } from "../../../store/comments"


const DeleteCommentModal = ({ comment }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleter = async () => {
        await dispatch(deleteCommentThunk(comment.id))
    }

    return (
        <>
            <div className="form-data">
                <div>Are you sure you want to delete your comment?</div>
            </div>
            <div className="modal-buttons">
                <button className="green-button" onClick={closeModal}>Cancel</button>
                <button className="red-button" onClick={deleter} type="submit">Delete Comment</button>
            </div>
        </>
    )
}

export default DeleteCommentModal

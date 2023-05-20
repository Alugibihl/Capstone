import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from "../../OpenModalButton"
import DeleteCommentModal from "../deleteComment"



const OneComment = ({ comment, allUsers }) => {
    const dispatch = useDispatch()
    const user = allUsers.find(user => user.id === comment.userId)
    const sessionUser = useSelector(state => state.session.user)
    console.log("users", user, sessionUser);

    return (
        <div>
            <div>Posted by: {user?.username}</div>
            <div>
                {comment.details}
            </div>
            {sessionUser?.id === user?.id ?
                <div>
                    <div>
                        <OpenModalButton
                            className="red-button"
                            buttonText={"Delete Comment"}
                            modalComponent={<DeleteCommentModal comment={comment} />} />
                    </div>
                </div> : "hi"}
        </div>
    )
}

export default OneComment

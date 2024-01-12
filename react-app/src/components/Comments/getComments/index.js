import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentsThunk } from "../../../store/comments";
import OneComment from "../oneComment";
import CreateCommentForm from "../addComment";
import EditCommentForm from "../editComment";
import 'bulma/css/bulma.css';
import '../../../index.css'

const CommentsByRecipe = ({ recipe }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const recipeComments = useSelector(state => state.comments.comments.comment);
    const allUsers = useSelector(state => state.comments.comments.user);
    const user = useSelector(state => state.session.user);
    const [editFormStatus, setEditFormStatus] = useState({});
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [deleteVisible, setDeleteVisible] = useState(false);

    useEffect(() => {
        dispatch(getAllCommentsThunk(recipe.id));
    }, [dispatch, recipe]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditFormStatus({});
        setSelectedCommentId(null);
        setDeleteVisible(false);
    };

    const editVisibility = (commentId) => {
        const currentStatus = { ...editFormStatus };
        currentStatus[commentId] = !currentStatus[commentId];
        setEditFormStatus(currentStatus);
        setSelectedCommentId(commentId);
        setDeleteVisible(false);
    };

    if (!recipeComments) return null;
    if (!allUsers) return null;

    return (
        <div>
            <div>
                <button className="button is-primary is-small" onClick={openModal}>
                    <i className="fa fa-regular fa-comment"></i> Comments
                </button>
            </div>
            <div className={`modal ${isOpen ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Comments ({recipeComments.length})</p>
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="comments-modal-text">
                            <div className="comment-page-title">
                                <h2>Please keep your comments respectful</h2>
                                {!editFormStatus[selectedCommentId] && (
                                    <div>
                                        <CreateCommentForm recipe={recipe} />
                                    </div>
                                )}
                                <div>
                                    {recipeComments.map((comment) => (
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
                                                    {editFormStatus[comment.id] && (
                                                        <div>
                                                            <EditCommentForm comment={comment} recipe={recipe} setEditFormStatus={setEditFormStatus} editFormStatus={editFormStatus} />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CommentsByRecipe;

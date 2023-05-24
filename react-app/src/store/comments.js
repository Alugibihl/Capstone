const GET_COMMENTS = "comments/GET_ALL"
const CREATE_COMMENT = "comments/CREATE"
const EDIT_COMMENT = "comments/EDIT"
const DELETE_COMMENT = "comments/DELETE"


export const getCommentsByRecipe = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}
export const createComment = (details) => {
    return {
        type: CREATE_COMMENT,
        payload: details
    }
}
export const editComment = (details) => {
    return {
        type: EDIT_COMMENT,
        details
    }
}

export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const getAllCommentsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${recipeId}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getCommentsByRecipe(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const createaCommentThunk = (details) => async (dispatch) => {
    const response = await fetch("/api/comments/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            details
        ),
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(createComment(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const editOneCommentThunk = (commentId, data) => async (dispatch) => {
    console.log("comment", commentId);
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            data.item
        ),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getCommentsByRecipe(data.id))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        dispatch(deleteComment(commentId));
        return commentId
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}






const initialState = {
    comments: {}
}

const CommentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS: {
            newState = { ...state }
            newState.comments = { ...action.payload }
            return newState
        }
        case CREATE_COMMENT: {
            newState = { ...state, comments: { ...state.comments } }
            newState.comments[action.payload.id] = action.payload
            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state, comments: { ...state.comments } }
            delete newState.comments[action.ingredientId]
            return newState
        }
        case EDIT_COMMENT: {
            newState = { ...state };
            newState.comments[action.details.id] = {
                ...newState.comments[action.details.id],
                ...action.details,
            };
            console.log("this is new state", newState);
            return newState;
        }
        default:
            return state
    }
}

export default CommentReducer

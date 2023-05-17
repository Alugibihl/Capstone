const Load_All = "categories/LOAD_ALL"

export const getAllCategories = (data) => {
    return {
        type: Load_All,
        payload: data
    }
}

export const getAllCategoriesThunk = () => async (dispatch) => {
    const response = await fetch("/api/categories")
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllCategories(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

const initialState = {
    categories: {}
}

const CategoryReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case Load_All: {
            newState = { ...state }
            newState.categories = { ...action.payload }
            return newState
        }
        default:
            return state
    }
}

export default CategoryReducer

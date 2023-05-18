const LOAD_All = "categories/LOAD_ALL"
const LOAD_ONE = "categories/LOAD_ONE"

export const getAllCategories = (data) => {
    return {
        type: LOAD_All,
        payload: data
    }
}
export const getOneCategory = (data) => {
    return {
        type: LOAD_ONE,
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
export const getOneCategoryThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/categories/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getOneCategory(data))
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
        case LOAD_All: {
            newState = { ...state }
            newState.categories = { ...action.payload }
            return newState
        }
        case LOAD_ONE: {
            newState = { ...state }
            newState.categories = { ...action.payload }
            return newState
        }
        default:
            return state
    }
}

export default CategoryReducer

const GET_INGREDIENT = "ingredients/GET_ALL"
const GET_ONE = "ingredients/GET_ONE"
const CREATE_INGREDIENT = "ingredients/CREATE"
const EDIT_INGREDIENT = "ingredients/EDIT"
const DELETE_INGREDIENT = "ingredients/DELETE"

export const getAllIngredients = (ingredients) => {
    return {
        type: GET_INGREDIENT,
        payload: ingredients
    }
}
export const getOneIngredient = (ingredient) => {
    return {
        type: GET_ONE,
        payload: ingredient
    }
}
export const createIngredient = (details) => {
    return {
        type: CREATE_INGREDIENT,
        payload: details
    }
}
export const editIngredient = (details) => {
    return {
        type: EDIT_INGREDIENT,
        details
    }
}

export const deleteIngredient = (ingredientId) => {
    return {
        type: DELETE_INGREDIENT,
        ingredientId
    }
}

export const getAllIngredientsThunk = () => async (dispatch) => {
    const response = await fetch("/api/ingredients")
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllIngredients(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const getOneIngredientThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getOneIngredient(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const createIngredientThunk = (details) => async (dispatch) => {
    const response = await fetch("/api/ingredients/new", {
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
        console.log("--create thunk data--", data);
        dispatch(createIngredient(data))
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

export const editOneIngredientThunk = (info) => async (dispatch) => {
    const { item, ingredient } = info
    console.log('details in Edit Thunk', ingredient);
    const response = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            item
        ),
    });
    if (response.ok) {
        const data = await response.json();
        console.log("----- data in edit thunk---", data);
        dispatch(editIngredient(data));
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
export const deleteIngredientThunk = (ingredientId) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${ingredientId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        dispatch(deleteIngredient(ingredientId));
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}


const initialState = {
    ingredients: {}
}

const IngredientReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_INGREDIENT: {
            newState = { ...state }
            newState.ingredients = { ...action.payload }
            return newState
        }
        case GET_ONE: {
            newState = { ...state }
            newState.ingredients = { ...action.payload }
            return newState
        }
        case CREATE_INGREDIENT: {
            newState = { ...state, ingredients: { ...state.ingredients } }
            console.log("this is to be looked at", action.payload);
            newState.ingredients[action.payload.id] = action.payload
            return newState
        }
        case DELETE_INGREDIENT: {
            newState = { ...state }
            delete newState.ingredients[action.ingredientId]
            return newState
        }
        case EDIT_INGREDIENT: {
            newState = { ...state, ingredients: { ...state.ingredients } }
            newState.ingredients[action.details.id] = action.details
            return newState
        }
        default:
            return state
    }
}

export default IngredientReducer

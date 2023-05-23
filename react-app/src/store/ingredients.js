const GET_INGREDIENT = "ingredients/GET_ALL"
const GET_ONE = "ingredients/GET_ONE"
const CREATE_INGREDIENT = "ingredients/CREATE"
const EDIT_INGREDIENT = "ingredients/EDIT"
const DELETE_INGREDIENT = "ingredients/DELETE"
const GET_USER_INGREDIENTS = "/ingredients/CURRENT_USER"

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

export const getIngredients = (details) => {
    return {
        type: GET_USER_INGREDIENTS,
        payload: details
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
    console.log("create thunk details", details);
    const response = await fetch("/api/ingredients/new", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        body: details
    });
    if (response.ok) {
        const data = await response.json()
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

export const getIngredientsByUser = () => async (dispatch) => {
    const response = await fetch("/api/ingredients/current")
    if (response.ok) {
        const data = await response.json()
        dispatch(getIngredients(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const editOneIngredientThunk = (info) => async (dispatch) => {
    const { formData, ingredient } = info
    console.log('details in Edit Thunk', ingredient);
    const response = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: "PUT",
        body: formData
    });
    if (response.ok) {
        const data = await response.json();
        console.log("----- data in edit thunk---", data);
        dispatch(editIngredient(data));
        // dispatch(getOneIngredient(data.id))
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
    console.log("delete thunk", ingredientId);
    const response = await fetch(`/api/ingredients/${ingredientId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        dispatch(deleteIngredient(ingredientId));
        return ingredientId
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
            console.log("this is to be looked at", action.payload);
            newState = { ...state, ingredients: { ...state.ingredients } }
            newState.ingredients[action.payload.id] = action.payload
            return newState
        }
        case DELETE_INGREDIENT: {
            newState = { ...state, ingredients: { ...state.ingredients } }
            delete newState.ingredients[action.ingredientId]
            return newState
        }
        case EDIT_INGREDIENT: {
            newState = { ...state };
            newState.ingredients[action.details.id] = {
                ...newState.ingredients[action.details.id],
                ...action.details,
            };
            console.log("this is new state", newState);
            return newState;
        }
        case GET_USER_INGREDIENTS: {
            newState = { ...state }
            newState.ingredients = { ...action.payload }
            return newState
        }
        default:
            return state
    }
}

export default IngredientReducer

const GET_RECIPES = "recipes/GET_ALL"
const GET_ONE = "recipes/GET_ONE"
const CREATE_RECIPE = "recipes/CREATE"
const EDIT_RECIPE = "recipes/EDIT"
const DELETE_RECIPE = "recipes/DELETE"
const GET_USER_RECIPES = "recipes/CURRENT_USER"
const GET_USER_LIKED_RECIPES = "recipes/CURRENT_USER_LIKES"

export const getAllRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        payload: recipes
    }
}
export const getOneRecipe = (recipe) => {
    return {
        type: GET_ONE,
        payload: recipe
    }
}
export const createRecipe = (details) => {
    return {
        type: CREATE_RECIPE,
        payload: details
    }
}
export const editRecipe = (details) => {
    return {
        type: EDIT_RECIPE,
        details
    }
}
export const getRecipes = (details) => {
    return {
        type: GET_USER_RECIPES,
        payload: details
    }
}
export const getLikedRecipes = (details) => {
    return {
        type: GET_USER_LIKED_RECIPES,
        payload: details
    }
}

export const deleteRecipe = (recipeId) => {
    return {
        type: DELETE_RECIPE,
        recipeId
    }
}


export const getAllRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes")
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllRecipes(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const getOneRecipeThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getOneRecipe(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const getRecipeByUser = () => async (dispatch) => {
    const response = await fetch("/api/recipes/current")
    if (response.ok) {
        const data = await response.json()
        dispatch(getRecipes(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const getLikedRecipeByUser = () => async (dispatch) => {
    const response = await fetch("/api/recipes/likes/current")
    if (response.ok) {
        const data = await response.json()
        dispatch(getRecipes(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}


export const createRecipeThunk = (details) => async (dispatch) => {
    // console.log("details", details);
    const response = await fetch("/api/recipes/new", {
        method: "POST",
        body:
            details
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(createRecipe(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            // return data.errors;
            return data.errors.ingredient_ids
        }
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const editOneRecipeThunk = (info) => async (dispatch) => {
    const { formData, recipe } = info
    const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: "PUT",
        body: formData,
    });
    if (response.ok) {
        const data = await response.json();
        // console.log("data", data);
        dispatch(editRecipe(data));
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

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        dispatch(deleteRecipe(recipeId));
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const addLikeThunk = (data) => async (dispatch) => {
    const { recipeId, current } = data
    // console.log("in add like thunk", recipeId);
    const response = await fetch(`/api/recipes/${recipeId}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:
            current.id
    });
    if (response.ok) {
        dispatch(getOneRecipe(recipeId))
        return response;
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const deleteLikeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        dispatch(getOneRecipe(recipeId))
        return response;
    } else {
        return ["An error occurred. Please try again."];
    }
};


const initialState = {
    recipes: {},
};

const RecipeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RECIPES:
            newState = { ...state };
            newState.recipes = { ...action.payload };
            return newState;

        case GET_ONE:
            newState = { ...state };
            newState.recipes = { ...action.payload };
            return newState;

        case CREATE_RECIPE:
            newState = { ...state, recipes: { ...state.recipes } };
            newState.recipes[action.payload.id] = action.payload;
            return newState;

        case DELETE_RECIPE:
            newState = { ...state };
            delete newState.recipes[action.recipeId];
            return newState;

        case EDIT_RECIPE:
            newState = { ...state, recipes: { ...state.recipes } };
            newState.recipes[action.details.id] = action.details;
            return newState;

        case GET_USER_RECIPES:
            newState = { ...state };
            newState.recipes = { ...action.payload };
            return newState;

        case GET_USER_LIKED_RECIPES:
            newState = { ...state };
            newState.recipes = { ...action.payload };
            return newState;
        default:
            return state;
    }
}
export default RecipeReducer

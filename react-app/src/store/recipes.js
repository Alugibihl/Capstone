const GET_RECIPES = "recipes/GET_ALL"

export const GetAllRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        payload: recipes
    }
}



export const GetAllRecipesThunk = () = async (dispatch) => {
    const response = await fetch("/api/recipes")
    if (response.ok) {
        const data = await response.json()
        dispatch(GetAllRecipes(data))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}





const initialState = {}

const RecipeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        default:
            return state
    }
}

export default RecipeReducer

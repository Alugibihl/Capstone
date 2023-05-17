import { useDispatch, useSelector } from "react-redux";
import RecipeDisplay from "../allrecipes";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneRecipeThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";


function OneRecipe() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes.recipes.recipe)
    const { category } = useSelector(state => state.categories.categories)
    const myCategory = category?.find(cat => cat.id === recipe?.categoryId)
    console.log("here", id, recipe, category, myCategory);

    useEffect(() => {
        dispatch(getOneRecipeThunk(id))
        dispatch(getAllCategoriesThunk())
    }, [dispatch, id])
    if (!recipe) return null
    if (!category) return null
    return (
        <div className="single-item-container">
            <img src={recipe.image} alt={recipe.name}></img>
            <div><h2>{recipe.name}</h2>Cuisine Category: {myCategory.name} </div>
            <div>{recipe.details}</div>
        </div>
    )
}

export default OneRecipe

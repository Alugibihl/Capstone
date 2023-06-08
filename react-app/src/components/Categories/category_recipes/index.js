import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategoriesThunk, getOneCategoryThunk } from "../../../store/category";
import { useParams } from "react-router-dom";
import RecipeDisplay from "../../Recipes/allrecipes";
import { getAllRecipesThunk } from "../../../store/recipes";
import NotFound from "../../PageNotFound";

function OneCategory() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const categories = useSelector(state => state.recipes.recipes.categories)
    const category = categories?.find(category => category.id === Number(id))
    const recipes = useSelector(state => state.recipes.recipes.recipes)
    const recArr = []

    useEffect(() => {
        dispatch(getAllRecipesThunk())
    }, [dispatch, id])

    if (!category) return null
    const categoryRecipes = recipes?.map((recipe) => {
        if (recipe.categoryId === category.id) { recArr.push(recipe) }
        return recArr
    })
    if (!categoryRecipes) return <NotFound />

    return (
        <div className="single-item-container">
            <div className="category-title"><h2>{category.name}</h2></div>
            <div className="category-desc">{category.description}</div>
            <div className="category-recipe-styling">{recArr?.map((recipe) => {
                return <RecipeDisplay key={recipe.id} recipe={recipe} />
            })}</div>
        </div >
    )
}

export default OneCategory

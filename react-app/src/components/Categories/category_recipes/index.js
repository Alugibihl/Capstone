import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneCategoryThunk } from "../../../store/category";
import { useParams } from "react-router-dom";
import { getAllRecipesThunk } from "../../../store/recipes";
// import CategoryRecipes from "../categoryRecipesLlist";
import RecipeDisplay from "../../Recipes/allrecipes";

function OneCategory() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const categoryRecipes = useSelector(state => state.categories.categories.recipes)
    const categories = useSelector(state => state.recipes.recipes.categories)
    const category = categories?.find(category => category.id === Number(id))
    console.log("categories", category, id, categoryRecipes);
    useEffect(() => {
        dispatch(getOneCategoryThunk(id))
        dispatch(getAllRecipesThunk())
    }, [dispatch, id])

    if (!categories) return null
    if (!categoryRecipes) return null
    return (
        <div className="single-item-container">
            <div><h2>{category.name}</h2></div>
            <div>{categoryRecipes?.map((recipe) => {
                return <RecipeDisplay key={recipe.id} recipe={recipe} />
            })}</div>
        </div >
    )
}

export default OneCategory

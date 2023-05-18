import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneRecipeThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";
import OpenModalButton from "../../OpenModalButton";
import DeleteRecipeModal from "../deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal";


function OneRecipe() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes.recipes.recipe)
    const { category } = useSelector(state => state.categories.categories)
    const myCategory = category?.find(cat => cat.id === recipe?.categoryId)
    const user = useSelector(state => state.session.user)
    console.log("here", id, user, recipe, category, myCategory);

    useEffect(() => {
        dispatch(getOneRecipeThunk(id))
        dispatch(getAllCategoriesThunk())
    }, [dispatch, id])

    let greenButton = "green-button"
    let redButton = "red-button"

    if (!recipe) return null
    if (!category) return null
    return (
        <div className="single-item-container">
            <img src={recipe.image} alt={recipe.name}></img>
            <div ><h2>{recipe.name}</h2><div className="poster">Cuisine Category: {myCategory.name}</div> </div>
            <div className="poster">Recipe By: {user.username}</div>
            <div className="single-details">{recipe.details}</div>
            <div>
                {user && user.id === recipe.userId && <div> <OpenModalButton
                    className="red-button"
                    buttonText={"Delete a recipe"}
                    modalComponent={<DeleteRecipeModal recipe={recipe} />} /></div>}
                {user && user.id === recipe.userId && <div> <OpenModalButton
                    className="green-button"
                    buttonText={"Edit a recipe"}
                    modalComponent={<EditRecipeModal recipe={recipe} />} /></div>}
            </div>

        </div >
    )
}

export default OneRecipe

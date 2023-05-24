import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneRecipeThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";
import OpenModalButton from "../../OpenModalButton";
import DeleteRecipeModal from "../deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal";
import CommentsByRecipe from "../../Comments/getComments"
// import { getAllCommentsThunk } from "../../../store/comments";

function OneRecipe() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes.recipes.recipe)
    const category = useSelector(state => state.categories.categories.category)
    const myCategory = category?.find(cat => cat.id === recipe?.categoryId)
    const user = useSelector(state => state.session.user)
    const recipeOwner = useSelector(state => state.recipes.recipes.users)

    useEffect(() => {
        dispatch(getOneRecipeThunk(id))
        dispatch(getAllCategoriesThunk())
    }, [dispatch, id])

    if (!user) return <Redirect to={"/login"} />
    if (!recipe) return null
    if (!recipeOwner) return null
    if (!category) return null
    return (
        <div className="single-item-container wrap-break">
            <img style={{ objectFit: "cover" }} src={recipe.image} alt={recipe.name}></img>
            <div className="name-holder wrap-break"><h2 >{recipe.name}</h2><div className="wrap-break poster">Cuisine Category: {myCategory.name}</div>
                <div>
                    <OpenModalButton
                        buttonText={<i class="fa fa-regular fa-comment"></i>}
                        modalComponent={<CommentsByRecipe recipe={recipe} />} />
                </div>
            </div>
            <div className="poster">Recipe By: {recipeOwner[0].username}</div>
            <div className="single-details wrap-break">{recipe.details}</div>
            <div className="modal-buttons">
                {user && user.id === recipe.userId && <div> <OpenModalButton
                    className="red-button"
                    buttonText={"Delete this recipe"}
                    modalComponent={<DeleteRecipeModal recipe={recipe} />} /></div>}
                {user && user.id === recipe.userId && <div> <OpenModalButton
                    className="green-button"
                    buttonText={"Edit this recipe"}
                    modalComponent={<EditRecipeModal recipe={recipe} />} /></div>}
            </div>

        </div >
    )
}

export default OneRecipe

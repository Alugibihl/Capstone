import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addLikeThunk, deleteLikeThunk, getLikes, getOneRecipeThunk, getRecipeLikesThunk } from "../../../store/recipes";
import { getAllCategoriesThunk } from "../../../store/category";
import OpenModalButton from "../../OpenModalButton";
import DeleteRecipeModal from "../deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal";
import CommentsByRecipe from "../../Comments/getComments";

function OneRecipe() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes.recipes.recipe)
    const category = useSelector(state => state.categories.categories.category)
    const myCategory = category?.find(cat => cat.id === recipe?.categoryId)
    const user = useSelector(state => state.session.user)
    const recipeOwner = useSelector(state => state.recipes.recipes.users)
    // const [liked, setLiked] = useState(false)
    // const [numLikes, setNumLikes] = useState(recipe?.likes ? recipe.likes : null)
    // console.log("track recipes", recipe, "likes", recipe?.likes);

    useEffect(() => {
        dispatch(getOneRecipeThunk(id))
        dispatch(getAllCategoriesThunk())
    }, [dispatch, id])


    if (!user) return <Redirect to={"/login"} />
    if (!recipe) return null
    if (!recipeOwner) return null
    if (!category) return null

    // const addLike = async () => {
    //     setLiked(!liked)
    //     setNumLikes(numLikes + 1)
    //     await dispatch(addLikeThunk(recipe.id))
    //     await dispatch(getRecipeLikesThunk(recipe.id))
    // }

    // const removeLike = async () => {
    //     setLiked(!liked)
    //     setNumLikes(numLikes - 1)
    //     await dispatch(deleteLikeThunk(recipe.id))
    //     await dispatch(getRecipeLikesThunk(recipe.id))
    // }

    return (
        <div className="single-item-container wrap-break">
            <img style={{ objectFit: "cover" }} src={recipe.image} alt={recipe.name}></img>
            <div className="name-holder wrap-break"><h2 >{recipe.name}</h2><div className="wrap-break poster">Cuisine Category: {myCategory.name}</div>
                <div>
                    {/* <div>{numLikes} Likes</div>
                    <div className="post-box">
                        {liked ?
                            <button className="nav-icon" style={{ color: 'red' }} onClick={removeLike}><i class="fas fa-regular fa-thumbs-down"></i></button> :
                            <button className="nav-icon" onClick={addLike}><i class="fas fa-regular fa-thumbs-up"></i></button>
                        }
                    </div> */}
                    <div>
                        <OpenModalButton
                            buttonText={<i class="fa fa-regular fa-comment"></i>}
                            modalComponent={<CommentsByRecipe recipe={recipe} />} />
                    </div>
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

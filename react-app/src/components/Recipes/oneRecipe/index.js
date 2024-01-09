import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addLikeThunk, deleteLikeThunk, getOneRecipeThunk } from "../../../store/recipes";
import OpenModalButton from "../../OpenModalButton";
import DeleteRecipeModal from "../deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal";
import CommentsByRecipe from "../../Comments/getComments";
import NotFound from "../../PageNotFound";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import 'bulma/css/bulma.css';

function OneRecipe() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes.recipes.recipe)
    const category = useSelector(state => state.categories.categories.category)
    const myCategory = category?.find(cat => cat.id === recipe?.categoryId)
    const user = useSelector(state => state.session.user)
    const recipeOwner = useSelector(state => state.recipes.recipes.users)
    const [numLikes, setNumLikes] = useState(recipe?.likes ? recipe?.likes?.length : "fish")
    const [liked, setLiked] = useState(false)
    const [editVisible, setEditVisible] = useState(false)

    useEffect(() => {
        dispatch(getOneRecipeThunk(id))
    }, [dispatch, id])

    useEffect(() => {
        setNumLikes(recipe?.likes?.length)
        if (recipe?.likes) {
            for (let like of recipe.likes) {
                if (like.id === user.id) { setLiked(true) }
            }
        }
    }, [recipe, user])


    if (!recipe) return <NotFound />
    if (!recipeOwner) return null
    if (!category) return null
    if (!recipe.relations) return null

    const visibility = () => setEditVisible(!editVisible)

    const addLike = async () => {
        setLiked(!liked);
        setNumLikes(numLikes + 1);
        const val = { recipeId: recipe.id, current: user };
        await dispatch(addLikeThunk(val));
    };

    const removeLike = async () => {
        setLiked(!liked);
        setNumLikes(numLikes - 1);
        await dispatch(deleteLikeThunk(recipe.id));
    };

    return (
        <div className="single-item-container wrap-break">
            <img style={{ objectFit: "cover" }} src={recipe.image} alt={recipe.name}></img>
            <div className="name-holder wrap-break"><h2 >{recipe.name}</h2><div className="wrap-break poster">Cuisine Category: {myCategory.name}</div>
                <div className="icon-org">
                    <div>{numLikes} Likes</div>
                    <div className="post-box">
                        {liked ?
                            <button className="nav-icon" style={{ color: 'red' }} onClick={removeLike}><i className="fas fa-regular fa-thumbs-down"></i></button> :
                            <button className="nav-icon" onClick={addLike}><i className="fas fa-regular fa-thumbs-up"></i></button>
                        }
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText={<i class="fa fa-regular fa-comment"></i>}
                            modalComponent={<CommentsByRecipe recipe={recipe} />} />
                    </div>
                    {user && user.id === recipe.userId && <div>
                        <button onClick={visibility}><i className="fas fa-ellipsis-h"></i></button>
                        <div className={editVisible ? "placement" : "hidden"}>
                            <div className="icon-org">
                                <div> <OpenModalButton
                                    className="button is-danger is-rounded is-small"
                                    buttonText={"Delete this recipe"}
                                    modalComponent={<DeleteRecipeModal recipe={recipe} />} /></div>
                                <div> <OpenModalButton
                                    className="button is-success is-rounded is-small"
                                    buttonText={"Edit this recipe"}
                                    modalComponent={<EditRecipeModal recipe={recipe} />} /></div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="poster">Recipe By: {recipeOwner[0].username}</div>
            <div className="alignment wrap-break">
                <div className="single-details wrap-break">{recipe.details}</div>
                <div className="relate-box"><h4>Ingredients: </h4>{recipe?.relations.length ? (
                    recipe.relations.map((ingred) => {
                        return <div key={ingred.id}><NavLink to={`/ingredients/${ingred.id}`} >{ingred.name}</NavLink></div>
                    })
                ) : "Ingredients not provided"}</div>
            </div>

        </div >
    )
}

export default OneRecipe

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLikeThunk, deleteLikeThunk, getOneRecipeThunk } from "../../../store/recipes";
import DeleteRecipeModal from "../deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal";
import CommentsByRecipe from "../../Comments/getComments";
import { NavLink } from "react-router-dom";
import 'bulma/css/bulma.css';

function OneRecipe() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipe = useSelector(state => state.recipes.recipes.recipe);
    const category = useSelector(state => state.categories.categories.category);
    const myCategory = category?.find(cat => cat.id === recipe?.categoryId);
    const user = useSelector(state => state.session.user);
    const recipeOwner = useSelector(state => state.recipes.recipes.users);
    const [numLikes, setNumLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        dispatch(getOneRecipeThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        setNumLikes(recipe?.likes ? recipe?.likes?.length : 0);
        setLiked(!!recipe?.likes?.find(like => like.id === user?.id));
    }, [recipe, user]);

    const visibility = () => setEditVisible(!editVisible);
    const toggleComments = () => setShowComments(!showComments);

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
        <div className="container" style={{ maxWidth: "100%", overflow: "hidden" }}>
            <div className="columns is-centered" style={{ marginTop: "20px" }}>
                <div className="column is-half">
                    {recipe && recipe.image && (
                        <img
                            className="is-fullwidth-desktop is-fullwidth-mobile"
                            src={recipe.image}
                            alt={recipe.name}
                            style={{ borderRadius: "10px" }}
                        />
                    )}
                    {recipe && (
                        <>
                            <h2 className="title">{recipe.name}</h2>
                            <p>Cuisine Category: {myCategory?.name}</p>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    {numLikes} Likes{" "}
                                    {user && (liked ? (
                                        <button className="button is-danger is-small" onClick={removeLike}>
                                            <i className="fas fa-regular fa-thumbs-down"></i>
                                        </button>
                                    ) : (
                                        <button className="button is-small" onClick={addLike}>
                                            <i className="fas fa-regular fa-thumbs-up"></i>
                                        </button>
                                    ))}
                                    {user && (
                                        <div>
                                            <CommentsByRecipe recipe={recipe} />
                                        </div>
                                    )}
                                    {user && user.id === recipe.userId && (
                                        <div style={{ marginLeft: "auto" }}>
                                            <button className="button is-small" onClick={visibility}>
                                                <i className="fas fa-ellipsis-h"></i>
                                            </button>
                                            <div className={editVisible ? "buttons" : "hidden"}>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <div>
                                                        <DeleteRecipeModal recipe={recipe} />
                                                    </div>

                                                    <div>
                                                        <EditRecipeModal recipe={recipe} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>Recipe By: {recipeOwner[0]?.username}</div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}

export default OneRecipe;

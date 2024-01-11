import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLikeThunk, deleteLikeThunk, getOneRecipeThunk } from "../../../store/recipes";
import OpenModalButton from "../../OpenModalButton";
import DeleteRecipeModal from "../deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal";
import CommentsByRecipe from "../../Comments/getComments";
import NotFound from "../../PageNotFound";
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
    const [numLikes, setNumLikes] = useState(recipe?.likes ? recipe?.likes?.length : "fish");
    const [liked, setLiked] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    useEffect(() => {
        dispatch(getOneRecipeThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        setNumLikes(recipe?.likes?.length);
        if (recipe?.likes) {
            for (let like of recipe.likes) {
                if (like.id === user.id) {
                    setLiked(true);
                }
            }
        }
    }, [recipe, user]);

    const visibility = () => setEditVisible(!editVisible);

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
                                    {liked ? (
                                        <button style={{ color: "red" }} onClick={removeLike}>
                                            <i className="fas fa-regular fa-thumbs-down"></i>
                                        </button>
                                    ) : (
                                        <button onClick={addLike}>
                                            <i className="fas fa-regular fa-thumbs-up"></i>
                                        </button>
                                    )}
                                    <OpenModalButton
                                        buttonText={<i className="fa fa-regular fa-comment"></i>}
                                        modalComponent={<CommentsByRecipe recipe={recipe} />}
                                    />
                                    {user && user.id === recipe.userId && (
                                        <div style={{ marginLeft: "auto" }}>
                                            <button onClick={visibility}>
                                                <i className="fas fa-ellipsis-h"></i>
                                            </button>
                                            <div className={editVisible ? "buttons" : "hidden"}>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <div>
                                                        {" "}
                                                        <OpenModalButton
                                                            className="button is-danger is-rounded is-small"
                                                            buttonText={"Delete this recipe"}
                                                            modalComponent={<DeleteRecipeModal recipe={recipe} />}
                                                        />
                                                    </div>
                                                    <div>
                                                        {" "}
                                                        <OpenModalButton
                                                            className="button is-success is-rounded is-small"
                                                            buttonText={"Edit this recipe"}
                                                            modalComponent={<EditRecipeModal recipe={recipe} />}
                                                        />
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
            <div className="columns is-centered">
                <div className="column is-half">
                    {recipe && <p>{recipe.details}</p>}
                </div>
                <div className="column is-one-fifth">
                    <h4>Ingredients: </h4>
                    {recipe && recipe.relations.length ? (
                        recipe.relations.map(ingred => (
                            <div key={ingred.id}>
                                <NavLink to={`/ingredients/${ingred.id}`}>
                                    {ingred.name}
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        "Ingredients not provided"
                    )}
                </div>
            </div>
        </div>
    );
}

export default OneRecipe;

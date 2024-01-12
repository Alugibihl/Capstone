import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllIngredientsThunk } from "../../../store/ingredients";
import DeleteIngredientModal from "../delete_ingredient_modal";
import EditIngredientModal from "../edit_ingredient_modal";
import NotFound from "../../PageNotFound";
import 'bulma/css/bulma.css';

function OneIngredient() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredients);
    const ingredient = ingredients?.find(ingredient => +ingredient.id === +id);
    const ingredientOwner = ingredient?.user;
    const currentUser = useSelector(state => state.session.user);
    const [editVisible, setEditVisible] = useState(false);

    useEffect(() => {
        dispatch(getAllIngredientsThunk());
    }, [dispatch, id]);

    if (!ingredient) return <NotFound />;
    if (!ingredientOwner) return null;

    const visibility = () => setEditVisible(!editVisible);

    return (
        <div className="container" style={{ maxWidth: "100%", overflow: "hidden" }}>
            <div className="columns is-centered" style={{ marginTop: "20px" }}>
                <div className="column is-half">
                    {ingredient && ingredient.image && (
                        <img
                            className="is-fullwidth-desktop is-fullwidth-mobile"
                            src={ingredient.image}
                            alt={ingredient.name}
                            style={{ objectFit: "cover", borderRadius: "10px" }}
                        />
                    )}
                    {ingredient && (
                        <>
                            <div className="container">
                                <div>
                                    <h2>{ingredient.name}</h2>
                                    {currentUser && currentUser.id === ingredient.userId && (
                                        <button className="button is-small is-info" onClick={visibility}>
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {currentUser && currentUser.id === ingredient.userId && (
                                <div>
                                    <div className={editVisible ? "buttons" : ""}>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <div>
                                                <DeleteIngredientModal ingredient={ingredient} />
                                            </div>

                                            <div>
                                                <EditIngredientModal ingredient={ingredient} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>Ingredient By: {ingredientOwner.username}</div>
                            <div>{ingredient.details}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OneIngredient;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByUser } from "../../../store/recipes";
import RecipeDisplay from "../allrecipes";
import OpenModalButton from "../../OpenModalButton";
import CreateRecipeModal from "../createRecipes";
import NotFound from "../../PageNotFound";
import 'bulma/css/bulma.css';

const UserRecipes = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes.recipes.recipes);

    useEffect(() => {
        dispatch(getRecipeByUser());
    }, [dispatch]);

    if (!recipes) return <NotFound />;

    // Split recipes into rows of 2
    const rows = [];
    for (let i = 0; i < recipes.length; i += 2) {
        rows.push(recipes.slice(i, i + 2));
    }

    return (
        <div className="container">
            <div>
                <h1 className="title">Your Recipes</h1>
                <div>
                    {recipes?.length === 0 ? (
                        <div>
                            <div>No Recipes Yet. Make one now!</div>
                            <div>
                                <OpenModalButton
                                    className="button is-success is-rounded is-medium"
                                    buttonText={"Create your first Recipe!"}
                                    modalComponent={<CreateRecipeModal />}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
                {rows.map((row, index) => (
                    <div key={index} className="columns is-multiline">
                        {row.map((recipe) => (
                            <div key={recipe.id} className="column is-half">
                                <RecipeDisplay recipe={recipe} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserRecipes;

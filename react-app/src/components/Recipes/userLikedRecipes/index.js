import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedRecipeByUser } from "../../../store/recipes";
import RecipeDisplay from "../allrecipes";
import NotFound from "../../PageNotFound";
import { useHistory } from "react-router-dom";
import 'bulma/css/bulma.css';

const UserLikedRecipes = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes.recipes.liked_recipes);
    const history = useHistory();

    useEffect(() => {
        dispatch(getLikedRecipeByUser());
    }, [dispatch]);

    const home = () => {
        let path = "/";
        history.push(path);
    }

    if (!recipes) return <NotFound />;

    // Split liked recipes into rows of 2
    const rows = [];
    for (let i = 0; i < recipes.length; i += 2) {
        rows.push(recipes.slice(i, i + 2));
    }

    return (
        <div className="container">
            <div>
                <h1 className="title">Recipes You've Liked</h1>
                <div>
                    {recipes?.length === 0 ? (
                        <div>
                            <div>No Recipes Liked, Try some out now!</div>
                            <div>
                                <button className="button is-danger is-rounded is-small" onClick={home}>
                                    Back to Recipes
                                </button>
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

export default UserLikedRecipes;

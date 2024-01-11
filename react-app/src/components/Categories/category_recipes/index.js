import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllRecipesThunk } from "../../../store/recipes";
import RecipeDisplay from "../../Recipes/allrecipes"; // Assuming you have a RecipeDisplay component
import NotFound from "../../PageNotFound";
import 'bulma/css/bulma.css';

function OneCategory() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const categories = useSelector(state => state.recipes.recipes.categories);
    const category = categories?.find(category => category.id === Number(id));
    const recipes = useSelector(state => state.recipes.recipes.recipes);
    const recArr = [];

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch, id]);

    if (!category) return null;

    // Filter recipes based on the category
    const categoryRecipes = recipes?.filter(recipe => recipe.categoryId === category.id);

    if (!categoryRecipes || categoryRecipes.length === 0) return <NotFound />;

    return (
        <div className="container">
            <div className="title">
                <h2>{category.name}</h2>
            </div>
            <div className="subtitle">{category.description}</div>
            <div className="columns is-multiline">
                {categoryRecipes.map((recipe) => (
                    <div className="column is-half" key={recipe.id}>
                        <RecipeDisplay recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OneCategory;

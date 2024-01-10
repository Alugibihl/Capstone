import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRecipesThunk } from "../../store/recipes";
import IngredientDisplay from "../Ingredients/ingredient_display";
import RecipeDisplay from "./allrecipes";
import "./recipes.css";
import 'bulma/css/bulma.css';

const HomePage = () => {
    const recipes = useSelector(state => state.recipes.recipes);
    const ingredients = useSelector(state => state.recipes.recipes.ingredients);
    const categories = useSelector(state => state.recipes.recipes.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch]);

    let recipesArr = [];
    let ingredientsArr = [];

    if (!recipes) return null;
    if (!ingredients) return null;
    if (!categories) return null;

    for (let recipe of recipes.recipes) {
        if (recipesArr.length < 12)
            recipesArr.push(recipe);
    }

    for (let ingredient of ingredients) {
        if (ingredientsArr.length < 12)
            ingredientsArr.push(ingredient);
    }

    return (
        <div className="container">
            <div className="columns is-multiline">
                <div className="column is-12">
                    <h4 className="title is-4">Currently Popular Recipes</h4>
                </div>
                {recipesArr.map(recipe => (
                    <div key={recipe.id} className="column is-4">
                        <RecipeDisplay recipe={recipe} />
                    </div>
                ))}
            </div>
            <div className="columns is-multiline">
                <div className="column is-12">
                    <h4 className="title is-4">Best Ingredients to have on hand</h4>
                </div>
                {ingredientsArr.map(ingredient => (
                    <div key={ingredient.id} className="column is-3">
                        <IngredientDisplay ingredient={ingredient} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

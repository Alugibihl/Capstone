import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsByUser } from "../../../store/ingredients";
import OpenModalButton from "../../OpenModalButton";
import CreateIngredientModal from "../add_ingredient_modal";
import UserIngredientDisplay from "../user_ingredient_display/userIngredientDisplay";
import 'bulma/css/bulma.css';

const UserIngredients = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredients);

    useEffect(() => {
        dispatch(getIngredientsByUser());
    }, [dispatch]);

    if (!ingredients) return null;

    // Split ingredients into rows of 2
    const rows = [];
    for (let i = 0; i < ingredients.length; i += 2) {
        rows.push(ingredients.slice(i, i + 2));
    }

    return (
        <div className="container">
            <div>
                <h1 className="title">Your Ingredients</h1>
                <div>
                    {ingredients?.length === 0 ? (
                        <div>
                            <div>No Ingredients Yet. Make one Now!</div>
                            <div>
                                <OpenModalButton
                                    className="button is-success is-rounded is-medium"
                                    buttonText={"Create your First Ingredient!"}
                                    modalComponent={<CreateIngredientModal />}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
                {rows.map((row, index) => (
                    <div key={index} className="columns is-multiline">
                        {row.map((ingredient) => (
                            <div key={ingredient.id} className="column is-half">
                                <UserIngredientDisplay ingredient={ingredient} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserIngredients;

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllIngredientsThunk } from "../../../store/ingredients";
import DeleteIngredientModal from "../delete_ingredient_modal";
import OpenModalButton from "../../OpenModalButton";
import EditIngredientModal from "../edit_ingredient_modal";
import NotFound from "../../PageNotFound";
import 'bulma/css/bulma.css';

function OneIngredient() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const ingredients = useSelector(state => state.ingredients.ingredients.ingredients)
    const ingredient = ingredients?.find(ingredient => +ingredient.id === +id)
    const ingredientOwner = ingredient?.user
    const currentUser = useSelector(state => state.session.user)
    const [editVisible, setEditVisible] = useState(false)

    useEffect(() => {
        dispatch(getAllIngredientsThunk())
    }, [dispatch, id])

    if (!ingredient) return <NotFound />
    if (!ingredientOwner) return null

    const visibility = () => setEditVisible(!editVisible)

    return (
        <div className="container">
            <div className="single-item-container">
                <img style={{ objectFit: "cover" }} src={ingredient.image} alt={ingredient.name}></img>
                <div className="container">
                    <div className="name-holder wrap-break orgs"><h2 className="name-size">{ingredient.name}</h2> {currentUser && currentUser.id === ingredient.userId && <button
                        onClick={visibility}><i className="fas fa-ellipsis-h"></i></button>}</div>
                </div>
                {currentUser && currentUser.id === ingredient.userId && <div>
                    <div className={editVisible ? "placement" : "hidden"}>
                        <div className="icon-org">
                            <div>
                                <OpenModalButton
                                    className="button is-danger is-rounded is-small"
                                    buttonText={"Delete this ingredient"}
                                    modalComponent={<DeleteIngredientModal ingredient={ingredient} />} /></div>
                            <div>
                                <OpenModalButton
                                    className="button is-success is-rounded is-small"
                                    buttonText={"Edit this ingredient"}
                                    modalComponent={<EditIngredientModal ingredient={ingredient} />} /></div>
                        </div>
                    </div>
                </div>}
                <div className="poster wrap-break">Ingredient By: {ingredientOwner.username}</div>
                <div className="single-details wrap-break">{ingredient.details}</div>
            </div >
        </div>
    )
}

export default OneIngredient

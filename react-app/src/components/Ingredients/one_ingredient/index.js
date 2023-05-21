import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneIngredientThunk } from "../../../store/ingredients";
import DeleteIngredientModal from "../delete_ingredient_modal";
import OpenModalButton from "../../OpenModalButton";
import EditIngredientModal from "../edit_ingredient_modal";


function OneIngredient() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const ingredient = useSelector(state => state.ingredients.ingredients.ingredient)
    const user = useSelector(state => state.session.user)
    const ingredientOwner = useSelector(state => state.ingredients.ingredients.users)

    useEffect(() => {
        dispatch(getOneIngredientThunk(id))
    }, [dispatch, id])

    if (!user) return <Redirect to={"/login"} />
    if (!ingredient) return null
    if (!ingredientOwner) return null
    return (
        <div className="single-item-container">
            <img style={{ objectFit: "cover" }} src={ingredient.image} alt={ingredient.name}></img>
            <div><h2>{ingredient.name}</h2></div>
            <div className="poster">Ingredient By: {ingredientOwner[0].username}</div>
            <div className="single-details">{ingredient.details}</div>
            <div className="modal-buttons">
                {user && user.id === ingredient.userId && <div>
                    <OpenModalButton
                        className="red-button"
                        buttonText={"Delete this ingredient"}
                        modalComponent={<DeleteIngredientModal ingredient={ingredient} />} /></div>}
                {user && user.id === ingredient.userId && <div>
                    <OpenModalButton
                        className="green-button"
                        buttonText={"Edit this ingredient"}
                        modalComponent={<EditIngredientModal ingredient={ingredient} />} /></div>}
            </div>
        </div >
    )
}

export default OneIngredient

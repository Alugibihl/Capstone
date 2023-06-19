import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneIngredientThunk } from "../../../store/ingredients";
import DeleteIngredientModal from "../delete_ingredient_modal";
import OpenModalButton from "../../OpenModalButton";
import EditIngredientModal from "../edit_ingredient_modal";
import NotFound from "../../PageNotFound";

function OneIngredient() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const ingredient = useSelector(state => state.ingredients.ingredients.ingredient)
    const alls = useSelector(state => state.ingredients.ingredients)
    const user = useSelector(state => state.session.user)
    const ingredientOwner = useSelector(state => state.ingredients.ingredients.users)
    const [editVisible, setEditVisible] = useState(false)
    console.log("here", ingredient, "all", alls);

    useEffect(() => {
        dispatch(getOneIngredientThunk(id))
    }, [dispatch, id])

    if (!ingredient) return <NotFound />
    if (!ingredientOwner) return null

    const visibility = () => setEditVisible(!editVisible)

    return (
        <div className="single-item-container">
            <img style={{ objectFit: "cover" }} src={ingredient.image} alt={ingredient.name}></img>
            <div className="name-holder wrap-break orgs"><h2>{ingredient.name}</h2> {user && user.id === ingredient.userId && <button onClick={visibility}><i className="fas fa-ellipsis-h"></i></button>}</div>
            {user && user.id === ingredient.userId && <div>
                <div className={editVisible ? "placement" : "hidden"}>
                    <div className="icon-org">
                        <div>
                            <OpenModalButton
                                className="red-button"
                                buttonText={"Delete this ingredient"}
                                modalComponent={<DeleteIngredientModal ingredient={ingredient} />} /></div>
                        <div>
                            <OpenModalButton
                                className="green-button"
                                buttonText={"Edit this ingredient"}
                                modalComponent={<EditIngredientModal ingredient={ingredient} />} /></div>
                    </div>
                </div>
            </div>}
            <div className="poster wrap-break">Ingredient By: {ingredientOwner[0].username}</div>
            <div className="single-details wrap-break">{ingredient.details}</div>
        </div >
    )
}

export default OneIngredient

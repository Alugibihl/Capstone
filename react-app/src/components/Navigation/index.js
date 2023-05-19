import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateRecipeModal from '../Recipes/createRecipes';
import OpenModalButton from '../OpenModalButton';
import CreateIngredientModal from '../Ingredients/add_ingredient_modal';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	let date = new Date().toDateString()

	return (
		<div className='navbar'>
			<div className='today'>{date}
			</div>
			<h1 className='title'><NavLink to="/">The New Fork Dines</NavLink></h1>
			{sessionUser === null ? <div><button className='blue-button'><NavLink to={"/login"}>
				Login</NavLink></button></div> : null}

			{isLoaded && (
				<div className='button-sort'>
					{sessionUser && <div className='create-buttons'>
						<div><OpenModalButton
							className="green-button"
							buttonText={"Create a New Recipe!"}
							modalComponent={<CreateRecipeModal />} /></div>
						<div><OpenModalButton
							className="green-button"
							buttonText={"Create a New Ingredient!"}
							modalComponent={<CreateIngredientModal />} /></div>
					</div>}
					<div className='login-icon'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateRecipeModal from '../Recipes/createRecipes';
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	let date = new Date().toDateString()
	return (
		<div className='navbar'>
			<div className='today'>{date}
			</div>
			<div className='title'>
				<NavLink exact to="/">The New Fork Dines</NavLink>
			</div>
			{isLoaded && (
				<div>
					<div><OpenModalButton
						buttonText={"Create a New Recipe!"}
						modalComponent={<CreateRecipeModal />} /></div>
					<div className='login-icon'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;

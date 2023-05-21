import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateRecipeModal from '../Recipes/createRecipes';
import OpenModalButton from '../OpenModalButton';
import CreateIngredientModal from '../Ingredients/add_ingredient_modal';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	let date = new Date().toDateString()
	const history = useHistory()

	const loginRoute = () => {
		let path = "/login"
		history.push(path)
	}
	const signupRoute = () => {
		let path = "/signup"
		history.push(path)
	}

	return (
		<div className='nav-background'>
			<div className='navbar'>
				<div className='today'>{date}
				</div>
				<h1 className='title'><NavLink to="/"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Ffork-clipart-fork-knife-12.png&f=1&nofb=1&ipt=a18a60daf24bbd79dd6ed07f3c7f8e3e931cc014b3ef3dea3f671be28d2050ed&ipo=images" alt="knife and fork">
				</img>  The New Fork Dines  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Ffork-clipart-fork-knife-12.png&f=1&nofb=1&ipt=a18a60daf24bbd79dd6ed07f3c7f8e3e931cc014b3ef3dea3f671be28d2050ed&ipo=images" alt="knife and fork"></img></NavLink></h1>
				{sessionUser === null ? <div className='title-buttons'><button onClick={loginRoute} className='blue-button'>Login</button><button onClick={signupRoute} className='blue-button' >Sign Up</button></div> : null}

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
		</div>
	);
}

export default Navigation;

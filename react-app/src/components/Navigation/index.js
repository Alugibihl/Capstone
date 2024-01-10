import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateRecipeModal from '../Recipes/createRecipes';
import OpenModalButton from '../OpenModalButton';
import CreateIngredientModal from '../Ingredients/add_ingredient_modal';
import { getAllCategoriesThunk } from '../../store/category';
import CategoryDisplay from '../Categories/category_display';
import fork from '../../Assets/fork.jpg';
import 'bulma/css/bulma.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const categories = useSelector((state) => state.categories.categories.category);

	useEffect(() => {
		getAllCategoriesThunk();
	}, []);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<div className='container'>
			<nav className='navbar is-transparent' role='navigation'>
				<div className='navbar-brand'>
					<NavLink className='navbar-item' to='/'>
						<img className='image is-24x24' src={fork} alt='knife and fork' />
						The New Fork Dines
						<img className='image is-24x24' src={fork} alt='knife and fork' />
					</NavLink>
					<div className={`navbar-burger ${showMobileMenu ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				{sessionUser === null ? (
					<div className='navbar-end'>
						<div className='nav-item'>
							<div className='buttons'>
								<NavLink to='/login' className='button is-primary is-rounded is-small'>
									Login
								</NavLink>
								<NavLink to='/signup' className='button is-light is-rounded is-small'>
									Sign Up
								</NavLink>
							</div>
						</div>
					</div>
				) : null}

				{isLoaded && (
					<div className={`navbar-menu ${showMobileMenu ? 'is-active' : ''}`}>
						{sessionUser && (
							<div className='navbar-start'>
								<div className='navbar-item has-dropdown is-hoverable'>
									<div className='navbar-link'>Cuisine Categories</div>
									<div className='navbar-dropdown'>
										{categories?.map((category) => (
											<CategoryDisplay className='navbar-item' key={category.id} category={category} />
										))}
									</div>
								</div>
								<div className='navbar-item'>
									<OpenModalButton
										className='button is-success is-rounded is-small'
										buttonText='Create a New Recipe!'
										modalComponent={<CreateRecipeModal />}
									/>
								</div>
								<div className='navbar-item'>
									<OpenModalButton
										className='button is-success is-rounded is-small'
										buttonText='Create a New Ingredient!'
										modalComponent={<CreateIngredientModal />}
									/>
								</div>
							</div>
						)}
						<div className='navbar-item'>
							<ProfileButton user={sessionUser} />
						</div>
					</div>
				)}
			</nav>
		</div>
	);
}

export default Navigation;

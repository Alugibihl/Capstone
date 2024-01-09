import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import 'bulma/css/bulma.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current === null || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login")
  };

  const recipeRoute = () => {
    let path = "/recipes/current"
    history.push(path)
  }
  const ingredientRoute = () => {
    let path = "/ingredients/current"
    history.push(path)
  }
  const yourRecipeRoute = () => {
    let path = "/recipes/likes/current"
    history.push(path)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user && <div>
        <div className="navbar-profile-button">
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>
        </div>
        <div className="navbar-profile-dropdown-container">
          {user && (
            <div className={ulClassName} ref={ulRef}>
              <div className="borders">
                <div className="profile-dropdown-user-link">
                  <div className="demo-exit"><h1>
                    {user.email}
                  </h1>
                    <button className="delete" onClick={closeMenu}></button>
                  </div>
                  <div>
                    <h2>Hello {user.username}</h2>
                    <h3>
                      To view the content created by your account
                      Click on a category below
                    </h3>
                  </div>

                  <p className="styling-line">Recipes</p>
                  <div className="buttons-recipes">
                    <button onClick={recipeRoute} className="button is-success is-rounded is-small">Your Recipes</button>
                    <button onClick={yourRecipeRoute} className="button is-success is-rounded is-small">Liked Recipes</button>
                  </div>
                  <p className="styling-line">Ingredients</p>
                  <div>
                    <button onClick={ingredientRoute} className="button is-success is-rounded is-small">Your Ingredients</button>
                  </div>
                </div>
                <p className="styling-line">

                </p>
                <div >
                  <button
                    className="button is-danger is-rounded is-small"
                    onClick={handleLogout}
                    id="profile-dropdown-logout-button"
                  >
                    Log Out
                  </button>
                </div>
              </div >
            </div>
          )
          }
        </div >
      </div >}
    </>
  )
};
export default ProfileButton;

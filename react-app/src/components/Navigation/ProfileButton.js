import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";


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
                    <button className="exit-button" onClick={closeMenu}>X</button>
                  </div>
                  <div>
                    <h2>Hello {user.username}</h2>
                    <h3>
                      To view the content created by your account
                      Click on a category below
                    </h3>
                  </div>

                  <p className="styling-line">Recipes</p>
                  <div>
                    <button onClick={recipeRoute} className="green-button">Your Recipes</button>
                  </div>
                  <p className="styling-line">Ingredients</p>
                  <div>
                    <button onClick={ingredientRoute} className="green-button">Your Ingredients</button>
                  </div>
                </div>
                <p className="styling-line">

                </p>
                <div >
                  <button
                    className="red-button"
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

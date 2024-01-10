import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import 'bulma/css/bulma.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault();
    setIsActive(false);
    dispatch(logout());
    history.push("/login");
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <>
      {user && (
        <div>
          <div>
            <button
              className="button is-small"
              onClick={() => setIsActive(!isActive)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeMenu}></div>
            <div className="modal-content has-background-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '500px' }}>
              <div className="box">
                <div className="columns is-mobile">
                  <div className="column">
                    <h1 className="subtitle">{user.email}</h1>
                  </div>
                  <div className="column is-narrow">
                    <button
                      className="delete is-medium"
                      aria-label="close"
                      onClick={closeMenu}
                    ></button>
                  </div>
                </div>
                <div className="container">
                  <h2 className="subtitle">Hello {user.username}</h2>
                  <h3>
                    To view the content created by your account, click on a
                    category below
                  </h3>
                </div>
                <hr className="navbar-divider" />
                <div className="buttons">
                  <NavLink to="/recipes/current" className="button is-success is-rounded is-small" onClick={closeMenu}>Your Recipes</NavLink>
                  <NavLink to="/recipes/likes/current" className="button is-success is-rounded is-small" onClick={closeMenu}>Liked Recipes</NavLink>
                </div>
                <hr className="navbar-divider" />
                <div className="buttons">
                  <NavLink to="/ingredients/current" className="button is-success is-rounded is-small" onClick={closeMenu}>Your Ingredients</NavLink>
                </div>
                <hr className="navbar-divider" />
                <div className="buttons">
                  <button
                    className="button is-danger is-rounded is-small"
                    onClick={handleLogout}
                    id="profile-dropdown-logout-button"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileButton;

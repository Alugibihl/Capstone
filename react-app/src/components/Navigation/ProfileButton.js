import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { NavLink } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
  };

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
              <div className="profile-dropdown-user-link">
                <div>
                  Hello {user.username}
                </div>
                <div>
                  {user.email}
                </div>
                <div>
                  <p className="styling-line">

                  </p>

                </div>
                <div>

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
            </div>
          )
          }
        </div>
      </div >}
    </>
  )
};
export default ProfileButton;

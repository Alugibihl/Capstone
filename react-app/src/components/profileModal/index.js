import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import React, { useState, useEffect, useRef } from "react";
import { logout } from "../../store/session";
import { Redirect } from "react-router-dom";



function ProfileModal({ user, handleLogout }) {
    const { closeModal } = useModal();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "profile-dropdown" + (showMenu ? "profile-menu" : " hidden");
    const closeMenu = () => setShowMenu(false);

    if (!user) return <Redirect to="/login" />

    return (
        <>
            <ul className={ulClassName} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.email}</li>
                <li>
                    <button className="red-button" onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
        </>
    );
}


export default ProfileModal;

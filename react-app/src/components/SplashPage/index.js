import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import SignupFormModal from "../SignupFormModal";  // Import your SignupFormModal
import LoginFormModal from "../LoginFormModal";  // Import your LoginFormModal
import "./splash.css";
import 'bulma/css/bulma.css';

function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    if (sessionUser) return <Redirect to="/" />;

    const handleDemoClick = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
    }

    const handleSignupModalOpen = () => {
        setShowSignupModal(true);
    };

    const handleSignupModalClose = () => {
        setShowSignupModal(false);
    };

    const handleLoginModalOpen = () => {
        setShowLoginModal(true);
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    return (
        <div className="container">
            <h1 className="title">The New Fork Dines</h1>
            <h2 className="subtitle">The Worlds Premier Recipe Lineup</h2>
            <div className="box">
                <div className="container">
                    <button className="button is-info is-rounded is-small" onClick={handleSignupModalOpen}>Sign Up</button>
                    <SignupFormModal show={showSignupModal} onClose={handleSignupModalClose} />
                </div>
                <div className="container">
                    <LoginFormModal show={showLoginModal} onClose={handleLoginModalClose} />
                    <button className="button is-info is-rounded is-small" onClick={handleLoginModalOpen}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;

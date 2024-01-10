import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";
import { login } from "../../store/session";
import "./splash.css"
import 'bulma/css/bulma.css';

function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
    }

    return (
        <div className="container">
            <h1 className="title">The New Fork Dines</h1>
            <h2 className="subtitle">The Worlds Premier Recipe Lineup</h2>
            <div className="box">
                <div className="container" >
                    <SignupFormPage />
                </div>
                <div className="container">
                    <div className="container">
                        <LoginFormPage />
                        <button className="button is-info is-rounded is-small" onClick={handleClick}>Demo User</button>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default SplashPage;

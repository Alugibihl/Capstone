import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";
import { login } from "../../store/session";
import "./splash.css"

function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
    }

    return (

        <div className="splash-background">

            <div className="splash-page-container">
                <h1 >The New Fork Dines</h1>
                <h2>The Worlds Premier Recipe Lineup</h2>
                <div>
                    <div >
                        <div className="signup container" >
                            <SignupFormPage />
                        </div>
                    </div>
                    <div >
                        <div className="login-container" >
                            <div>
                                <LoginFormPage />
                            </div>
                            <div>
                                <button className="blue-button" onClick={handleClick}>Demo User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default SplashPage;

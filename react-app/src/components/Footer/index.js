import "./footer.css";
import 'bulma/css/bulma.css';

function Footer({ isLoaded }) {
    // const sessionUser = useSelector(state => state.session.user);
    return (
        <footer className="footer is-info">
            {isLoaded && (
                <div className="content">
                    <div className="columns is-centered">
                        <div className="column has-text-centered">
                            <a href="https://github.com/Alugibihl/The-New-Fork-Dines" rel="noopener noreferrer" target="_blank"><i className="fab fa-github"></i> Github Repo</a>
                        </div>
                        <div className="column has-text-centered">Created by Alexander Lugibihl @2023</div>
                        <div className="column has-text-centered">
                            <a href="https://www.linkedin.com/in/alexander-lugibihl-2abb70169/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i> Linkedin Profile</a>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;

import { useHistory } from "react-router-dom";
import 'bulma/css/bulma.css';


function NotFound() {
    const history = useHistory()

    return (

        <div className="unavailable">
            <h2>There's nothing here...</h2>
            <button className="button is-info is-rounded is-medium" onClick={() => history.push('/')}>Return to main page</button>
        </div >

    )
}


export default NotFound;

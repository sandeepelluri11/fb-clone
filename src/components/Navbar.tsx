import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../css/navbar.css";

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const username = user?.displayName;

    const loguserOut = () => {
        signOut(auth);
    }
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                {!user ? <Link to="/login">Login</Link> : <Link to="/createpost">createPost</Link> }
            </div>

            {user && 
                <div className="user">
                    <p className="same">{username}</p>
                    <img src={user?.photoURL || ""} width={20} height={20}></img>
                    <button onClick={loguserOut} className="same">Log out</button>
                </div>}
        </div>
    );
}
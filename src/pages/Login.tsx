import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth,provider);
        navigate("/");
        console.log(auth);
    }

    return (
        <div>
            <p>Sign in with Google to continue</p>
            <button onClick={signInWithGoogle}>Sign in</button>
        </div>
    );
}
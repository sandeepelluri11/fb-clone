import { Button, Container, Typography } from "@mui/material";
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
        <Container fixed>
            <Typography mt={2} ml={55} variant="h6">Sign in with Google to continue</Typography>
            <Button onClick={signInWithGoogle} sx={{mt: 2,ml: 67}} variant="contained" color="secondary">Sign in</Button>
        </Container>
    );
}
import { auth } from "../config/firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Box, AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const username = user?.displayName;

    const loguserOut = () => {
        signOut(auth);
    }
    return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="/">Home</Button>
          {!user ? <Button color="inherit" href="/login">Login</Button> : <Button color="inherit" href="/createpost">createPost</Button> }

          {user && 
                <Stack direction="row" spacing={2} sx={{ml: 130}}>
                    <Typography>{username}</Typography>
                    <img src={user?.photoURL || ""} width={20} height={20} style={{marginTop:9}}></img>
                    <Button color="inherit" onClick={loguserOut} >Log out</Button>
                </Stack>}
        </Toolbar>
      </AppBar>
    </Box>
    );
    
}
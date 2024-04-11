import { auth, provider } from "../config/firebase";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../config/firebase";
import { FinalPost } from "./posts/FinalPost";
import { Container, Typography } from "@mui/material";

export interface Post {
    id: string;
    userid: string;
    username: string;
    title: string;
    description: string;
}

export const Home = () => {

    const [user] = useAuthState(auth);

    const [postsList , setPostsList] = useState<Post[] | null>();

    const postsref = collection(db,"posts");

    const getPosts = async () => {
        const data = await getDocs(postsref);
        setPostsList(data.docs.map( (doc) => ({...doc.data(),id:doc.id})) as Post[]);
        
    }

    useEffect(() => {
        getPosts();
    },[]);

    return (
        <div>
            <Container>
                {user ? <Typography variant="h3" ml={33} mt={2}>Welcome {user?.displayName}</Typography> 
                : <Typography variant="h3" ml={40} mt={2}>Login to continue</Typography>}
                {user && postsList?.map((post: Post) => {
                    return <FinalPost post= {post} />
                })}
            </Container>
        </div>
    );
}
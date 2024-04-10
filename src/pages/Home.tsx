import { auth, provider } from "../config/firebase";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../config/firebase";
import { FinalPost } from "./posts/FinalPost";

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
            <h1>Welcome {user?.displayName}</h1>
            {user && postsList?.map((post: Post) => {
                return <FinalPost post= {post} />
            })}
        </div>
    );
}
import { Post } from "../Home";
import { db } from "../../config/firebase";
import { collection,addDoc, query, where, Query, getDocs, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "@firebase/firestore";
import { Container, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    post: Post
}

interface Like {
    userid: string;
}

export const FinalPost = (props: Props) => {

    const [user] = useAuthState(auth);

    const [likeCount, setLikeCount ] = useState<Like[] | null>();

    const likesref = collection(db, "likes");

    const likesDoc = query(likesref, where("postid", "==" , props.post.id ));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikeCount(data.docs.map((doc) => ({
            userid: doc.data().userid
        })));
    }

    const setLike = async () => {
        if (!userLiked) {
            await addDoc
            (likesref,
                { userid: user?.uid,
                  postid: props.post.id
                });
        }
        else {
            const userLikedDoc = query(likesref,(where("userid", "==" , user?.uid) && where("postid","==" , props.post.id)));
            const likeDataList = await getDocs(userLikedDoc);

            const removeDoc = doc(db, "likes", likeDataList.docs[0].id);
            await deleteDoc(removeDoc);
        }
        
    }

    useEffect(() => {
        getLikes();
    },[likeCount]);

    const userLiked = likeCount?.find((like) => like.userid===user?.uid)

    return (

        <Container sx={{backgroundColor: "lightgreen",marginBottom: 2}}>

            <Typography variant="h3" color="primary">@{props.post.username}</Typography>
            <Typography variant="h3" color="primary">{props.post.title}</Typography>
            <Typography variant="h3" color="primary">{props.post.description}</Typography>
            <IconButton onClick={setLike}>{userLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
            {likeCount?.length!==0 && <Typography variant="h5">Likes: {likeCount?.length}</Typography>}
        </Container>
    );

}
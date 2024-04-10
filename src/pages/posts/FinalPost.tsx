import { Post } from "../Home";
import { db } from "../../config/firebase";
import { collection,addDoc, query, where, Query, getDocs, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "@firebase/firestore";

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

    const userLiked = likeCount?.find((like) => like.userid==user?.uid)

    return (
        <div style={{backgroundColor: "skyblue", backgroundPositionY: 20}}>
            <h1>@{props.post.username}</h1>
            <h1>{props.post.title}</h1>
            <h1>{props.post.description}</h1>
            <button onClick={setLike}>{userLiked ? <>&#128078;</> : <>&#128077;</>}</button>
            {likeCount?.length!==0 && <h1>Likes: {likeCount?.length}</h1>}
            <br />
        </div>
    );

}
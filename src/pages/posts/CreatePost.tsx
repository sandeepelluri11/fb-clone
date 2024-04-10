import { auth, provider } from "../../config/firebase";
import { PostForm } from "./post-form";

export const CreatePost = () => {

    return (
        <div>
            <PostForm />
        </div>
    );
}
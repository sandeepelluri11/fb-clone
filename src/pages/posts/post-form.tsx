import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

interface FormData {
    title: string;
    description: string;
}

export const PostForm = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().min(10).required("title is reqired"),
        description: yup.string().required("description is reqired")
    })

    const {register, handleSubmit, formState} = useForm({
        resolver: yupResolver(schema)
    });

    const postsref = collection(db,"posts");

    const onSubmit = async (data: FormData) => {
        await addDoc(postsref,{
            userid: user?.uid,
            username: user?.displayName,
            title: data.title,
            description: data.description
        });

        navigate("/");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder='title' {...register("title")}></input> <br />
                <p>{formState.errors.title?.message}</p>
                <textarea placeholder='description' {...register("description")}></textarea> <br />
                <p>{formState.errors.description?.message}</p>
                <input type='submit'></input>
            </form>
        </div>
    );

}
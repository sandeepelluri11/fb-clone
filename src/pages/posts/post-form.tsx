import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField variant='outlined' label="title" fullWidth {...register("title")} sx={{marginBottom: 2, marginTop: 2}}/> <br />
                <Typography sx={{color: "red"}}>{formState.errors.title?.message}</Typography>
                <TextField variant='outlined' label="description" fullWidth multiline rows={4} {...register("description")} sx={{marginBottom: 2, marginTop: 2}}/>
                <Typography sx={{color: "red"}}>{formState.errors.description?.message}</Typography>
                <Button type='submit' variant='contained' endIcon={<ArrowForwardIosIcon fontSize='small' />}>create</Button>
            </form>
        </Container>
    );

}
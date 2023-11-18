import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../../apis/post';

export const CreatePage = () => {

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const navigate = useNavigate();

    const [error, setError] = useState();

    const onSubmit = async (data) => {
        try {
            await createPost(data);
            navigate(-1);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        document.title = 'Create / Demo social';
    }, []);


    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='content_register'>Content</label>
                <textarea
                    id='content_register'
                    {...register('content')}
                />
                {errors.content && (
                    <p> {errors.content.message}</p>
                )}
                <button type='submit'>Post</button>
            </form>
        </div>
    );
}

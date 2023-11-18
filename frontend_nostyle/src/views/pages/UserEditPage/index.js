import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getMyUser, updateUserData } from '../../../apis/user';
export const UserEditPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [errorWhileFetch, setFetchError] = useState();

    useEffect(() => {
        document.title = 'Edit Profile / Demo social';
        const fetchData = async () => {
            try {
                const res = await getMyUser();
                setValue('username', res.data.username);
                setValue('email', res.data.email);
                setValue('name', res.data.name);
                setValue('bio', res.data.bio);
                setValue('birthdate', res.data.birthdate);
            } catch (error) {
                setFetchError(error.message || 'Something went wrong!');
            }
        };
        fetchData();
    }, [setValue]);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await updateUserData(data);
            navigate('/home/all');
        } catch (error) {
            setFetchError(error.message || 'Something went wrong!');
        }
    };

    return (
        <div>
            {errorWhileFetch && <p style={{ color: 'red' }}>{errorWhileFetch}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='username_register'>Username</label>
                <input
                    id='username_register'
                    type='text'
                    {...register('username', { required: 'Please enter a valid username' })}
                />
                {errors.username && (
                    <p> {errors.username.message}</p>
                )}
                <label htmlFor='email_register'>Email</label>
                <input
                    id='email_register'
                    type='email'
                    {...register('email', { required: 'Please enter a valid email' })}
                />
                {errors.email && (
                    <p> {errors.email.message}</p>
                )}
                <label htmlFor='name_register'>Name</label>
                <input
                    id='name_register'
                    type='text'
                    {...register('name', { required: 'Please enter a valid name' })}
                />
                {errors.name && (
                    <p> {errors.name.message}</p>
                )}
                <label htmlFor='bio_register'>Bio</label>
                <textarea
                    id='bio_register'
                    {...register('bio')} />
                <label htmlFor='birthday_register'>Birthday</label>
                <input
                    id='birthday_register'
                    type='date'
                    {...register('birthdate')}
                />
                <button type='submit'>Save</button>
            </form>
        </div>
    );
}
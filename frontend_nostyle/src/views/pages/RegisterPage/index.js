import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerAPI } from '../../../apis/auth';

export const RegisterPage = () => {
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [error, setError] = useState();

    const onSubmit = async (data) => {
        try {
            await registerAPI(data);
            navigate('/home');
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        document.title = 'Register / Demo social';
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <br />
                <label htmlFor='email_register'>Email</label>
                <input
                    id='email_register'
                    type='email'
                    {...register('email', { required: 'Please enter a valid email' })}
                />
                {errors.email && (
                    <p> {errors.email.message}</p>
                )}
                <br />
                <label htmlFor='password_register'>Password</label>
                <input
                    id='password_register'
                    type='password'
                    {...register('password', { required: 'Please enter a valid password' })}
                />
                {errors.password && (
                    <p> {errors.password.message}</p>
                )}
                <br />

                <label htmlFor='name_register'>Name</label>
                <input
                    id='name_register'
                    type='text'
                    {...register('name', { required: 'Please enter a valid name' })}
                />
                {errors.name && (
                    <p> {errors.name.message}</p>
                )}
                <br />

                <label htmlFor='bio_register'>Bio</label>
                <textarea
                    id='bio_register'
                    {...register('bio')}
                />
                <br />
                <label htmlFor='birthday_register'>Birthday</label>
                <input
                    id='birthday_register'
                    type='date'
                    {...register('birthdate')}
                />
                <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};
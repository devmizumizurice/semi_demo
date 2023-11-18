import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../apis/auth';

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [error, setError] = useState();

    const onSubmit = async (data) => {
        try {
            await login(data);
            navigate('/home');
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        document.title = 'Login / Demo social';
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
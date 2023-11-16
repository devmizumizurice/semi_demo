import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerAPI } from "../../../api/auth";

export const RegisterPage = () => {
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        await registerAPI(data);
        navigate('/home');
    };

    return (
        <div>
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
                <label htmlFor='password_register'>Password</label>
                <input
                    id='password_register'
                    type='password'
                    {...register('password', { required: 'Please enter a valid password' })}
                />
                {errors.password && (
                    <p> {errors.password.message}</p>
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
                    type='text'
                    {...register('bio')}
                />
                <label htmlFor='birthday_register'>Birthday</label>
                <input
                    id='birthday_register'
                    type='date'
                    {...register('birthdate')}
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};
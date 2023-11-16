import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await login(data);
        navigate('/home');
    };

    return (
        <div>
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
                <label htmlFor='password_register'>Password</label>
                <input
                    id='password_register'
                    type='password'
                    {...register('password', { required: 'Please enter a valid password' })}
                />
                {errors.password && (
                    <p> {errors.password.message}</p>
                )}
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}
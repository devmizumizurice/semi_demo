import { Link } from 'react-router-dom';

export const TopPage = () => {
    return (
        <div>
            <Link to={'/register'}>Register</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    );
};
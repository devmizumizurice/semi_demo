import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TopPage = () => {
    useEffect(() => {
        document.title = 'Welcome / Demo social';
    }, []);
    return (
        <div>
            <Link to={'/register'}>Register</Link>
            <br />
            <Link to={'/login'}>Login</Link>
        </div>
    );
};
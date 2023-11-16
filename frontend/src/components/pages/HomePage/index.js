import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/auth';
export const HomePage = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        await logout();
        navigate('/');
    };

    return (
        <div>
            <p>Logged in</p>
            <br />
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
};

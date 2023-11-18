import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../../apis/auth';
import { getMyUser } from '../../../apis/user';

export const HomePage = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('uid');
        await logout();
        navigate('/');
    };

    const [data, setData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMyUser();
                setData(res.data);
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Outlet />
            <br />
            <nav>
                <ul>
                    <li>
                        <Link to='/home/all'>All Posts</Link>
                    </li>
                    <li>
                        <Link to='/home/explore'>Explore</Link>
                    </li>
                </ul>
            </nav>
            <br />
            <Link to='/create'>Create</Link>
            <br />
            <Link to={'/u/' + data.username}>Profile</Link>
            <br />
            <Link to='/user/edit'>Edit</Link>
            <br />
            <b>My user info</b>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br />
            username={data.username}
            <br />
            name={data.name}
            <br />
            avatar={data.avatar ?? 'null'}
            <br />
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
};

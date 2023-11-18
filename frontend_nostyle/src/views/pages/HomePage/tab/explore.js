import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

export const TabExplore = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?q=${searchQuery}`);
    };

    useEffect(() => {
        document.title = 'Explore / Demo social';
    }, []);

    return (
        <div>
            Explore
            <br />
            <input
                type='text'
                placeholder='Search users and posts'
                value={searchQuery}

                onChange={(e) => setSearchQuery(e.target.value)}

            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

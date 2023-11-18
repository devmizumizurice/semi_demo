import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchPost } from '../../../apis/post';
import { getSearchUser } from '../../../apis/user';
import { PostCard } from '../../components/post';
import { UserCard } from '../../components/user';

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [userPage, setUserPage] = useState(1);
    const [userData, setUserData] = useState([]);
    const [userError, setUserError] = useState();
    const [userHasMore, setUserHasMore] = useState(true);

    const [postPage, setPostPage] = useState(1);
    const [postData, setPostData] = useState([]);
    const [postError, setPostError] = useState();
    const [postHasMore, setPostHasMore] = useState(true);

    const fetchUserData = async (currentPage) => {
        try {
            const res = await getSearchUser(currentPage, searchParams.get('q'));
            setUserData((prevUsers) => [...prevUsers, ...res.data]);
            setUserPage((prevPage) => prevPage + 1);
            setUserHasMore(res.data.length !== 0);
        } catch (err) {
            setUserError(err.message || 'Something went wrong!');
        }
    };

    const fetchPostData = async (currentPage) => {
        try {
            const res = await getSearchPost(currentPage, searchParams.get('q'));
            setPostData((prevPosts) => [...prevPosts, ...res.data]);
            setPostPage((prevPage) => prevPage + 1);
            setPostHasMore(res.data.length !== 0);
        } catch (err) {
            setPostError(err.message || 'Something went wrong!');
        }
    };

    const handleSearch = () => {
        const query = document.getElementById('search').value;
        if (query === searchParams.get('q')) {
            return;
        }
        setSearchParams({ q: query });
        setUserPage(1);
        setPostPage(1);
        setUserData([]);
        setPostData([]);
    };

    useEffect(() => {
        if (!searchParams.get('q')) {
            navigate('/home/explore');
        } else {
            document.title = searchParams.get('q') + ' - Search / Demo social';
            fetchUserData(1);
            fetchPostData(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, searchParams]);


    return (
        <div>
            Search results for {searchParams.get('q')}
            <br />
            <input
                id='search'
                type='text'
                placeholder='Search Users and Posts'
            />
            <button onClick={handleSearch}>Search</button>
            <br />
            <b>User</b>
            <InfiniteScroll
                dataLength={userData.length}
                next={() => fetchUserData(userPage)}
                hasMore={userHasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>No more users</p>}
                height='300px'
            >
                {userData.map((user) => (
                    <div key={user.id}>
                        <UserCard data={user} />
                    </div>
                ))}
            </InfiniteScroll>
            <br />
            {userError && <p style={{ color: 'red' }}>{userError}</p>}
            <br />
            <b>Post</b>
            <InfiniteScroll
                dataLength={postData.length}
                next={() => fetchPostData(postPage)}
                hasMore={postHasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>No more posts</p>}
                height='300px'
            >
                {postData.map((post) => (
                    <div key={post.post_id}>
                        <PostCard data={post} />
                    </div>
                ))}
            </InfiniteScroll>
            {postError && <p style={{ color: 'red' }}>{postError}</p>}
        </div>
    );
};

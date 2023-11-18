import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import { getUserPost } from '../../../apis/post';
import { getUserDataFromUsername } from '../../../apis/user';
import { PostCard } from '../../components/post';

export const UserPage = (props) => {
    const username = useParams().username;
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [postError, setPostError] = useState();
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserDataFromUsername(username);
                setData(res.data);
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
        };
        fetchData();
    }, [username]);


    const fetchDataPost = async (currentPage) => {
        try {
            const res = await getUserPost(currentPage, username);
            setPosts((prevPosts) => [...prevPosts, ...res.data]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(res.data.length !== 0);
        } catch (err) {
            setPostError(err.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        document.title =  username + ' / Demo social';
        fetchDataPost(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatDate = (originalDate) => {
        const date = new Date(originalDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return (year + '/' + month + '/' + day);
    }
    const uid = localStorage.getItem('uid');
    let editButton;
    if (uid === data.id) {
        editButton = (<Link to='/user/edit'>Edit</Link>);
    }

    return (

        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            avatar={data.avatar ?? 'null'}
            <br />
            username={data.username}
            <br />
            name={data.name}
            <br />
            bio={data.bio}
            <br />
            createdAt={formatDate(data.createdAt)}
            <br />
            {editButton}
            <br />

            {postError && <p style={{ color: 'red' }}>{error}</p>}

            <InfiniteScroll
                dataLength={posts.length}
                next={() => fetchDataPost(page)}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>No more data</p>}
                // TODO:
                height='300px'
            >
                {posts.map(post =>
                (<div key={post.post_id}>
                    <PostCard data={post} removeLink />
                </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}
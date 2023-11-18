import { Link } from 'react-router-dom';
export const PostCard = (props) => {
    const post = props.data;
    const removeLink = props.removeLink;

    let usernamePannel = null;

    if (removeLink) {
        usernamePannel = (<>usename={post.user.username}</>);
    } else {
        usernamePannel = (
            <Link to={'/u/' + post.user.username}>
                usename={post.user.username}
            </Link>
        );
    }
    return (
        <div key={post.post_id}>
            <b>User data</b>
            <br />
            {usernamePannel}
            <br />
            name= {post.user.name}
            <br />
            avatar={post.user.avatar ?? 'null'}
            <br />
            <br />
            {post.content}
            <br />
            <br />
        </div>
    );
}
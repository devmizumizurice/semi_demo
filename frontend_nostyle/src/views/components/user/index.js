import { Link } from "react-router-dom";

export const UserCard = (props) => {
    const user = props.data;

    return (
        <div key={user.id}>
            <Link to={'/u/' + user.username}>
                usename={user.username}
            </Link>
            <br />
            name= {user.name}
            <br />
            avatar={user.avatar ?? 'null'}
            <br />
            <br />
        </div>
    );
}
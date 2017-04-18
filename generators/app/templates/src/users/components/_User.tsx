import { IUser } from 'ptz-user-domain';
import React from 'react';
import Relay from 'react-relay';

interface IUserProps {
    user: IUser;
}

class User extends React.Component<IUserProps, any> {
    render() {
        const { user } = this.props;
        return (
            <li>
                {user.id} <br />
                {user.email} <br />
                {user.displayName} <br />
                {user.imgUrl} <br />
                {user.userName} <br />
            </li>
        );
    }
}

export default Relay.createContainer(User, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                displayName,
                email,
                imgUrl,
                userName,
                id
            }
        `
    }
});

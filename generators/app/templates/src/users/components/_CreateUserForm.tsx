import React from 'react';
import { IUser, IUserArgs, User } from 'ptz-user-domain';
import Errors from '../../core/components/Errors';
import TextInput from '../../core/components/TextInput';
import PropTypes from 'prop-types';

interface ReactRef {
    value(val?): string;
}

interface IUserRefs {
    displayName?: ReactRef;
    email?: ReactRef;
    password?: ReactRef;
    userName?: ReactRef;
}

export default class CreateUserForm extends React.Component<any, any>{
    static propTypes = {
        createUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    userFormRef: IUserRefs = {};

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('createUserSubmit e', e);

        const userArgs: IUserArgs = {
            id: this.props.user.id,
            displayName: this.userFormRef.displayName.value(),
            email: this.userFormRef.email.value(),
            password: this.userFormRef.password.value(),
            userName: this.userFormRef.userName.value()
        };

        console.log('userArgs', userArgs);

        this.setUserForm(null);

        this.props.createUser(userArgs);
    }

    private setUserForm(user?: IUser) {
        this.userFormRef.displayName.value(user ? user.displayName : '');
        this.userFormRef.email.value(user ? user.email : '');
        this.userFormRef.password.value(user ? user.password : '');
        this.userFormRef.userName.value(user ? user.userName : '');
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setUserForm(this.props.user);
    }

    render() {
        const user = this.props.user;
        console.log('CreateUserForm props.user', user);

        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Create User</legend>
                        <TextInput
                            label="Display Name"
                            defaultValue={user.displayName}
                            ref={(input) => (this.userFormRef.displayName = input)}
                            possibleErrors={User.displayNameErrors}
                            errors={user.errors} />
                        <TextInput
                            label="User Name"
                            defaultValue={user.userName}
                            ref={(input) => (this.userFormRef.userName = input)}
                            possibleErrors={User.userNameErrors}
                            errors={user.errors} />
                        <TextInput
                            label="E-mail"
                            defaultValue={user.email}
                            ref={(input) => (this.userFormRef.email = input)}
                            possibleErrors={User.emailErrors}
                            errors={user.errors} />
                        <TextInput
                            label="Password"
                            type="password"
                            defaultValue={user.password}
                            ref={(input) => (this.userFormRef.password = input)}
                            possibleErrors={User.passwordErrors}
                            errors={user.errors} />
                        <button type="submit">Create User</button>
                        <Errors errors={user.errors} />
                    </fieldset>
                </form>
            </section>);
    }
}

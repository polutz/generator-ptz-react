import PropTypes from 'prop-types';
import { IUser, IUserArgs, User } from 'ptz-user-domain';
import React from 'react';
import Errors from '../../core/components/Errors';
import { IReactRef } from '../../core/components/IReactRef';
import TextInput from '../../core/components/TextInput';

interface IUserRefs {
    displayName?: IReactRef;
    email?: IReactRef;
    password?: IReactRef;
    userName?: IReactRef;
}

export default class CreateUserForm extends React.Component<any, any> {
    static propTypes = {
        createUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    userFormRef: IUserRefs = {};

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('createUserSubmit e', e);

        const userArgs: IUserArgs = {
            id: this.props.user.id,
            displayName: this.userFormRef.displayName.getValue(),
            email: this.userFormRef.email.getValue(),
            password: this.userFormRef.password.getValue(),
            userName: this.userFormRef.userName.getValue()
        };

        console.log('userArgs', userArgs);

        this.props.createUser(userArgs);
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setUserForm(this.props.user);
    }

    render() {
        const user = this.props.user;
        console.log('CreateUserForm props.user', user);

        this.setUserForm(this.props.user);

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

    private setUserForm(user?: IUser) {
        if (!this.userFormRef || !this.userFormRef.displayName)
            return;

        console.log('userFormRef', this.userFormRef);
        this.userFormRef.displayName.setValue(user ? user.displayName : '');
        this.userFormRef.email.setValue(user ? user.email : '');
        this.userFormRef.password.setValue(user ? user.password : '');
        this.userFormRef.userName.setValue(user ? user.userName : '');
    }
}

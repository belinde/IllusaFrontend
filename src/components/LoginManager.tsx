import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { User } from '../types';
import { connect } from 'react-redux';
import { IllusaState } from '../state';
import { doLogin, doLogout } from '../state/user';

const LoginManager = ({
    user,
    doLogin,
    doLogout,
}: {
    user: User;
    doLogin: (username: string, password: string) => void;
    doLogout: () => void;
}) => {
    console.log('ricalcolo loginmanager');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            doLogin(email, password);
        },
        [email, password, doLogin]
    );

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            switch (e.target.name) {
                case 'loginEmail':
                    setEmail(e.target.value);
                    break;
                case 'loginPassword':
                    setPassword(e.target.value);
                    break;
            }
        },
        [setEmail, setPassword]
    );

    if (user.id !== undefined) {
        if (email) setEmail('');
        if (password) setPassword('');
        return (
            <Navbar.Text>
                {user.displayName}
                <Button
                    onClick={doLogout}
                    className="ml-2"
                    variant="outline-warning"
                    size="sm"
                >
                    Logout
                </Button>
            </Navbar.Text>
        );
    }

    return (
        <Form inline onSubmit={onSubmit}>
            {user.errorMessage ? (
                <Navbar.Text className="mr-2">{user.errorMessage}</Navbar.Text>
            ) : null}
            <FormControl
                type="email"
                name="loginEmail"
                placeholder="email"
                value={email}
                onChange={onChange}
                className="mr-2"
            />
            <FormControl
                type="password"
                name="loginPassword"
                placeholder="password"
                value={password}
                onChange={onChange}
                className="mr-2"
            />
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default connect(
    (state: IllusaState) => ({
        user: state.user,
    }),
    { doLogin, doLogout }
)(LoginManager);

import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { User } from '../types';
import { connect } from 'react-redux';
import { IllusaState } from '../';
import { doLogin, doLogout, LoginData } from '../features/login/slice';

const LoginManager = ({
    user,
    doLogin,
    doLogout,
    error,
}: {
    user: User;
    doLogin: (login: LoginData) => void;
    doLogout: () => void;
    error: string;
}) => {
    const [login, setLogin] = useState<LoginData>({
        username: '',
        password: '',
    });

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            doLogin(login);
        },
        [login, doLogin]
    );

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) =>
            setLogin({ ...login, [e.target.name]: e.target.value }),
        [login]
    );

    if (user.id) {
        if (login.password) {
            setLogin({ username: '', password: '' });
        }
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
            {error ? <Navbar.Text className="mr-2">{error}</Navbar.Text> : null}
            <FormControl
                type="email"
                name="username"
                placeholder="email@address.com"
                value={login.username}
                onChange={onChange}
                className="mr-2"
            />
            <FormControl
                type="password"
                name="password"
                placeholder="password"
                value={login.password}
                onChange={onChange}
                className="mr-2"
            />
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default connect((state: IllusaState) => state.user, {
    doLogin,
    doLogout: () => doLogout(),
})(LoginManager);

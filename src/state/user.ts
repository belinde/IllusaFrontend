import { User } from '../types';
import { POST } from '../ajax';
import jwt_decode from 'jwt-decode';

const decodeJwt = (token: string): User => {
    console.log('decodeJwt', token);
    const decoded = jwt_decode<{ user: User }>(token);
    if (decoded.user) {
        return {
            ...decoded.user,
            token,
        };
    }
    return Anonymous;
};

const Anonymous: User = {
    displayName: 'Anonymous',
};

const USER_SET = 'USER_SET';
const USER_UNSET = 'USER_UNSET';

export const doLogin = (username: string, password: string) =>
    POST(
        '/oauth/token',
        {
            grant_type: 'password',
            username: username,
            password: password,
        },
        ({ access_token }) => ({
            type: USER_SET,
            user: decodeJwt(access_token),
        })
    );
export const doLogout = () => ({type: USER_UNSET});

export default (state: User = Anonymous, action: any) => {
    switch (action.type) {
        case USER_SET:
            return action.user;
        case USER_UNSET:
            return Anonymous;
    }
    return state;
};

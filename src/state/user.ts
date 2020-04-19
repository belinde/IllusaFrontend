import { User } from '../types';
import { POST } from '../ajax';
import jwt_decode from 'jwt-decode';
import { setToken } from '../middleware/ApiCaller';

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
    id: null,
    displayName: 'Anonymous',
    email: null,
    roles: [],
    token: null,
};

export const USER_SET = 'USER_SET';
export const USER_UNSET = 'USER_UNSET';
export const USER_ERROR = 'USER_ERROR';

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
        }),
        () => ({
            type: USER_ERROR,
        })
    );
export const doLogout = () => ({ type: USER_UNSET });

const storageKey = 'user';

const retrieveFromLocalStorage = (): User => {
    const json = localStorage.getItem(storageKey);
    if (json) {
        const decoded = JSON.parse(json);
        const jwt: { exp: number } = jwt_decode(decoded.token);
        if (jwt.exp > Date.now() / 1000) {
            return decoded;
        }
    }
    return Anonymous;
};

export default (state: User, action: any) => {
    switch (action.type) {
        case USER_SET:
            localStorage.setItem(storageKey, JSON.stringify(action.user));
            setToken(action.user.token);
            return action.user;
        case USER_UNSET:
            setToken(null);
            localStorage.removeItem(storageKey);
            return Anonymous;
        case USER_ERROR:
            setToken(null);
            return {
                ...Anonymous,
                errorMessage: 'Invalid email or password',
            };
        default:
            if (!state) {
                const retrieved = retrieveFromLocalStorage();
                setToken(retrieved.token);
                return retrieved;
            }
    }
    return state;
};

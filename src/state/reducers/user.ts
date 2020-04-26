import { User } from '../../types';
import jwt_decode from 'jwt-decode';
import { setToken } from '../../middleware/ApiCaller';
import { AnyAction, ActionCreator } from 'redux';

const decodeJwt = (token: string): User => {
    const decoded = jwt_decode<{ user: User }>(token);
    if (decoded.user) {
        return {
            ...decoded.user,
            token,
        };
    }
    return Anonymous;
};

const retrieveFromLocalStorage = (): User => {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
        const decoded = JSON.parse(json);
        const jwt: { exp: number } = jwt_decode(decoded.token);
        if (jwt.exp > Date.now() / 1000) {
            setToken(decoded.token);
            return decoded;
        }
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

const STORAGE_KEY = 'user';

export const USER_SET = 'USER_SET';
export const USER_UNSET = 'USER_UNSET';
export const USER_ERROR = 'USER_ERROR';

interface UserAction extends AnyAction {
    user: User;
}

export const userSet: ActionCreator<UserAction> = (access_token: string) => ({
    type: USER_SET,
    user: decodeJwt(access_token),
});
export const userUnset: ActionCreator<UserAction> = () => ({
    type: USER_UNSET,
    user: Anonymous,
});
export const userError: ActionCreator<UserAction> = () => ({
    type: USER_ERROR,
    user: Anonymous,
});


export default (state:User, action:UserAction) => {
    switch (action.type) {
        case USER_SET:
            localStorage.setItem(STORAGE_KEY, JSON.stringify(action.user));
            setToken(action.user.token);
            return action.user;
        case USER_UNSET:
            setToken(null);
            localStorage.removeItem(STORAGE_KEY);
            return Anonymous;
        case USER_ERROR:
            setToken(null);
            return {
                ...Anonymous,
                errorMessage: 'Invalid email or password',
            } as User;
    }

    return state || retrieveFromLocalStorage();
};


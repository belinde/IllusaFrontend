import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import jwt_decode from 'jwt-decode';
import { setToken, ajaxCall } from '../../middleware/ApiCaller';

const Anonymous: User = {
    id: null,
    displayName: 'Anonymous',
    email: null,
    roles: [],
};

const STORAGE_KEY = 'jwt_access_token';

const decodeJwtAndRegisterAuth = (token: string | null = localStorage.getItem(STORAGE_KEY)): User => {
    if (token) {
        const jwt: { exp: number; user: User } = jwt_decode(token);
        if (jwt.user && jwt.exp > Date.now() / 1000) {
            setToken(token);
            return jwt.user;
        }
    }
    localStorage.removeItem(STORAGE_KEY)
    return Anonymous;
};

export const doLogin = (username: string, password: string) =>
    ajaxCall(
        'POST',
        '/oauth/token',
        {
            grant_type: 'password',
            username,
            password,
        },
        ({ access_token }) => userSlice.actions.loggedIn(access_token),
        () => userSlice.actions.setError('Invalid email or password')
    );

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: decodeJwtAndRegisterAuth(),
        error: '',
    },
    reducers: {
        loggedIn(state, action: PayloadAction<string | null>) {
            if (action.payload) {
                state.user = decodeJwtAndRegisterAuth(action.payload);
                state.error = '';
                if (state.user.id) {
                    localStorage.setItem(STORAGE_KEY, action.payload);
                }
            }
        },
        doLogout(state) {
            state.user = Anonymous;
            state.error = '';
            localStorage.removeItem(STORAGE_KEY);
        },
        setError(state, action: PayloadAction<string>) {
            state.user = Anonymous;
            state.error = action.payload;
            localStorage.removeItem(STORAGE_KEY);
        },
    },
});

export const { doLogout } = userSlice.actions;
export default userSlice.reducer;

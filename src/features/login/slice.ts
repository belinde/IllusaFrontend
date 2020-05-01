import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import jwt_decode from 'jwt-decode';
import { setToken, apiCall } from '../../features/api';

const Anonymous: User = {
    id: null,
    displayName: 'Anonymous',
    email: null,
    roles: [],
};

export interface LoginData {
    username: string;
    password: string;
}

const STORAGE_KEY = 'jwt_access_token';

const decodeJwtAndRegisterAuth = (
    token: string | null = localStorage.getItem(STORAGE_KEY)
): User => {
    if (token) {
        const jwt: { exp: number; user: User } = jwt_decode(token);
        if (jwt.user && jwt.exp > Date.now() / 1000) {
            setToken(token);
            return jwt.user;
        }
    }
    localStorage.removeItem(STORAGE_KEY);
    return Anonymous;
};

export const doLogin = createAsyncThunk(
    'user/login',
    async (login: LoginData, { dispatch }) => {
        await apiCall('POST', '/oauth/token', {
            ...login,
            grant_type: 'password',
        })
            .then(({ access_token }) => dispatch(loggedIn(access_token)))
            .catch(() => dispatch(setError('Invalid email or password')));
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: decodeJwtAndRegisterAuth(),
        error: '',
    },
    reducers: {
        loggedIn(state, action: PayloadAction<string>) {
            state.user = decodeJwtAndRegisterAuth(action.payload);
            state.error = '';
            if (state.user.id) {
                localStorage.setItem(STORAGE_KEY, action.payload);
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

const { loggedIn, setError } = userSlice.actions;

export const { doLogout } = userSlice.actions;
export default userSlice.reducer;

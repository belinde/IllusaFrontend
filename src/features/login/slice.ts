import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import jwt_decode from 'jwt-decode';
import { apiCall, setToken } from '../../middleware/ApiCaller';

const Anonymous: User = {
    id: null,
    displayName: 'Anonymous',
    email: null,
    roles: [],
};
const STORAGE_KEY = 'jwt_access_token';

const decodeJwtAndRegisterAuth = (token: string | null): User => {
    if (token) {
        const jwt: { exp: number; user: User } = jwt_decode(token);
        if (jwt.user && jwt.exp > Date.now() / 1000) {
            setToken(token);
            return jwt.user;
        }
    }
    return Anonymous;
};

export const doLogin = createAsyncThunk(
    'user/login',
    (
        { username, password }: { username: string; password: string },
        thunkAPI
    ) =>
        apiCall('POST', '/oauth/token', {
            grant_type: 'password',
            username,
            password,
        })
            .then(({ access_token }) =>
                thunkAPI.dispatch(userSlice.actions.loggedIn(access_token))
            )
            .catch((err: Error) =>
                thunkAPI.dispatch(
                    userSlice.actions.setError('Invalid email or password')
                )
            )
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: decodeJwtAndRegisterAuth(localStorage.getItem(STORAGE_KEY)),
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
            state.error = action.payload;
        },
    },
});

export const { doLogout } = userSlice.actions;
export default userSlice.reducer;

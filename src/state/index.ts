import { combineReducers } from 'redux';
import user from './user';

export const IllusaReducer = combineReducers({
    user,
});

export type IllusaState = ReturnType<typeof IllusaReducer>;

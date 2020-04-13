import { combineReducers } from 'redux';
import user from './user';
import location from './location';

export const IllusaReducer = combineReducers({
    user,
    location
});

export type IllusaState = ReturnType<typeof IllusaReducer>;

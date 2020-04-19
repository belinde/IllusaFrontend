import { combineReducers } from 'redux';
import user from './user';
import scene from './scene';

export const IllusaReducer = combineReducers({
    user,
    scene
});

export type IllusaState = ReturnType<typeof IllusaReducer>;

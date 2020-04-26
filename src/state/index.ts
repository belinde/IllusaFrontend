import { combineReducers } from 'redux';
import user from './user';
import scene from './scene';
import { User, Scene } from '../types';

export const IllusaReducer = combineReducers({
    user,
    scene
});

export interface IllusaState {
    user: User;
    scene: Scene;
}

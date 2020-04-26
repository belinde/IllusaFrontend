import { combineReducers } from 'redux';
import user from './reducers/user';
import scene from './reducers/scene';
import breadcrumbs from './reducers/breadcrumbs';
import { User, Scene, SceneBreadcrumb } from '../types';

export const IllusaReducer = combineReducers({
    user,
    scene,
    breadcrumbs,
});

export interface IllusaState {
    user: User;
    scene: Scene;
    breadcrumbs: SceneBreadcrumb[];
}

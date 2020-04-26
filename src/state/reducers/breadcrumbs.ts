import { Scene, SceneBreadcrumb } from '../../types';
import { SCENE_SET } from './scene';

export default (
    state: SceneBreadcrumb[] = [],
    action: { type: string; scene: Scene }
) => {
    if (action.type === SCENE_SET) {
        return state.concat({ id: action.scene.id, label: action.scene.label });
    }
    return state;
};

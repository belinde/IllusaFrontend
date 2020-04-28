import { Scene } from '../../types';
import { GET, PUT, POST } from '../../ajax';
import { AnyAction } from 'redux';

export const SCENE_SET = 'SCENE_SET';
export const SCENE_EDIT = 'SCENE_EDIT';
export const SCENE_EDIT_START = 'SCENE_EDIT_START';
export const SCENE_EDIT_STOP = 'SCENE_EDIT_STOP';
export const SCENE_ADD_RELATED = 'SCENE_ADD_RELATED';

interface SceneAction extends AnyAction {
    scene?: Partial<Scene>;
}

export const sceneSet = (scene: Scene): SceneAction => ({
    type: SCENE_SET,
    scene,
});

export const sceneEdit = (scene: Partial<Scene>): SceneAction => ({
    type: SCENE_EDIT,
    scene,
});

export const sceneEditStart = () => ({ type: SCENE_EDIT_START });
export const sceneEditStop = () => ({ type: SCENE_EDIT_STOP });

export const sceneAddRelated = (field: 'parent' | 'prev'): SceneAction => ({
    type: SCENE_ADD_RELATED,
    scene: {
        [field]: {},
    },
});

export const loadScene = (id: number = 1) => {
    console.log('loadScene', id);
    return GET('/scene/' + id, sceneSet);
};

export const upsertScene = (scene: Scene) => {
    console.log('upsertScene', scene);
    return scene.id
        ? PUT('/scene', scene, sceneSet)
        : POST('/scene', scene, sceneSet);
};


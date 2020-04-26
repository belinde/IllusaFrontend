import { Scene } from '../../types';
import { GET, PUT, POST } from '../../ajax';
import { AnyAction } from 'redux';
import { sceneTypes } from '../../resources';

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

const STORAGE_KEY = 'current_scene';

const BlanckScene: Scene = {
    id: -1,
    editable: false,
    editing: false,
    parent: null,
    prev: null,
    next: null,
    children: [],
    type: 'region',
    label: '',
    description: '',
    shortDescription: '',
    attributes: [],
};

const retrieveFromLocalStorage = (): Scene => {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            console.log('Error parsing the scene in local storage:', e);
        }
    }
    return BlanckScene;
};

export default (state: Scene, action: SceneAction) => {
    switch (action.type) {
        case SCENE_SET:
            if (action.scene?.id) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(action.scene));
                return action.scene;
            }
            break;
        case SCENE_EDIT:
            let newState = { ...state };
            for (let field in action.scene) {
                switch (field) {
                    case 'description':
                    case 'shortDescription':
                    case 'label':
                        newState[field] = action.scene[field] || state[field];
                        break;
                    case 'editing':
                        if (typeof action.scene.editing !== 'undefined') {
                            newState.editing =
                                state.editable && action.scene.editing;
                        }
                        break;
                    case 'type':
                        newState.type = sceneTypes.reduce(
                            (acc, typ) =>
                                typ.key === action.scene?.type ? typ.key : acc,
                            state.type
                        );
                        break;
                    case 'attributes':
                        const wantedAttr = action.scene.attributes?.shift();
                        if (wantedAttr) {
                            newState.attributes = newState.attributes.includes(
                                wantedAttr
                            )
                                ? state.attributes.filter(
                                      (att) => att !== wantedAttr
                                  )
                                : state.attributes.concat(wantedAttr);
                        }
                        break;
                }
            }
            return newState;
        case SCENE_ADD_RELATED:
            let newScene = { ...BlanckScene };
            if (typeof action.scene?.parent !== 'undefined') {
                newScene.parent = state;
            }
            if (typeof action.scene?.prev !== 'undefined') {
                newScene.prev = state;
                newScene.next = state.next;
                newScene.parent = state.parent;
            }
            newScene.attributes = state.attributes;
            newScene.editable = true;
            newScene.editing = true;
            newScene.id = 0;
            return newScene;
    }
    return state || retrieveFromLocalStorage();
};

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Scene, sceneAsReference } from '../../types';
import { apiCall } from '../../features/api';

const STORAGE_KEY = 'last_selected_scene';

const emptyScene: Scene = {
    id: 0,
    label: '',
    type: 'region',
    description: '',
    shortDescription: '',
    attributes: [],
    editable: true,
    parent: null,
    prev: null,
    next: null,
    children: [],
};

export const upsertScene = createAsyncThunk(
    'scenes/upsert',
    (scene: Scene, { dispatch }) =>
        apiCall(scene.id ? 'PUT' : 'POST', '/scene', scene).then((scene) =>
            dispatch(scenesSlice.actions.setCurrent(scene))
        )
);

export const loadScene = createAsyncThunk(
    'scenes/load',
    (sceneId: number, { dispatch }) =>
        apiCall('GET', '/scene/' + sceneId).then((scene) =>
            dispatch(scenesSlice.actions.setCurrent(scene))
        )
);

const loadFromStorage = (): Scene => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : emptyScene;
};

const scenesSlice = createSlice({
    name: 'scenes',
    initialState: {
        current: loadFromStorage(),
        editing: false,
    },
    reducers: {
        setCurrent(state, action: PayloadAction<Scene>) {
            state.current = action.payload;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
        },

        toggleEditMode(state) {
            state.editing = !state.editing;
        },

        addRelated(state, action: PayloadAction<'parent' | 'prev'>) {
            const scene = state.current;
            state.editing = true;
            state.current = { ...emptyScene };

            if (action.payload === 'parent') {
                state.current.parent = sceneAsReference(scene);
            }
            if (action.payload === 'prev') {
                state.current.prev = sceneAsReference(scene);
                state.current.next = scene.next;
                state.current.parent = scene.parent;
            }
        },
    },
});

export const { addRelated, toggleEditMode } = scenesSlice.actions;
export default scenesSlice.reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Scene, sceneAsReference } from '../../types';
import { apiCall } from '../../middleware/ApiCaller';
import { IllusaState } from '../..';
import { selectAllScenes } from './selectors';

interface SceneStore {
    current: number;
    editing: boolean;
    all: Record<number, Scene>;
}

const STORAGE_KEY = 'last_selected_scene';

const initialState: SceneStore = {
    current: Number(localStorage.getItem(STORAGE_KEY)) || 1,
    editing: false,
    all: {},
};

export const upsertScene = createAsyncThunk(
    'scenes/upsert',
    async (scene: Scene, thunkAPI) => {
        apiCall(scene.id ? 'PUT' : 'POST', '/scene', scene).then((scene) =>
            thunkAPI.dispatch(addScene(scene))
        );
    }
);

export const loadScene = createAsyncThunk(
    'scenes/load',
    async (sceneId: number, thunkAPI) => {
        const all = selectAllScenes(thunkAPI.getState() as IllusaState);
        if (typeof all[sceneId] === 'undefined') {
            const scene = await apiCall('GET', '/scene/' + sceneId);
            thunkAPI.dispatch(addScene(scene));
            thunkAPI.dispatch(setCurrent(sceneId));
        } else {
            thunkAPI.dispatch(setCurrent(sceneId));
            return Promise.resolve();
        }
    }
);

const scenesSlice = createSlice({
    name: 'scenes',
    initialState,
    reducers: {
        setCurrent(state, action: PayloadAction<number>) {
            state.current = action.payload;
            state.editing = false;
            localStorage.setItem(STORAGE_KEY, action.payload.toString());
        },

        addScene(state, action: PayloadAction<Scene>) {
            state.all[action.payload.id] = action.payload;
            state.current = action.payload.id;
            localStorage.setItem(STORAGE_KEY, action.payload.toString());
        },

        toggleEditMode(state) {
            state.editing = !state.editing;
        },

        addRelated(state, action: PayloadAction<'parent' | 'prev'>) {
            const scene = state.all[state.current];

            state.current = 0;
            state.all[0] = {
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

            if (action.payload === 'parent') {
                state.all[0].parent = sceneAsReference(scene);
            }
            if (action.payload === 'prev') {
                state.all[0].prev = sceneAsReference(scene);
                state.all[0].next = scene.next;
                state.all[0].parent = scene.parent;
            }
        },
    },
});

export const {
    setCurrent,
    addScene,
    addRelated,
    toggleEditMode,
} = scenesSlice.actions;
export default scenesSlice.reducer;

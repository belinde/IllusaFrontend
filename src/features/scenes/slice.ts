import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Scene } from '../../types';
// import { sceneTypes } from '../../resources';
import { apiCall } from '../../middleware/ApiCaller';
import { IllusaState } from '../..';
import { selectAllScenes } from './selectors';

interface SceneStore {
    current: number;
    all: Record<number, Scene>;
}

const initialState: SceneStore = {
    current: 0,
    all: {},
};

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
        },
        addScene(state, action: PayloadAction<Scene>) {
            state.all[action.payload.id] = action.payload;
        },
    }
});

export const { setCurrent, addScene } = scenesSlice.actions;
export default scenesSlice.reducer;

// const initialState: Scene = {
//     id: -1,
//     editable: false,
//     editing: false,
//     parent: null,
//     prev: null,
//     next: null,
//     children: [],
//     type: 'region',
//     label: '',
//     description: '',
//     shortDescription: '',
//     attributes: [],
// };

// setScene(state, action: PayloadAction<Scene>) {
//     if (action.payload.id) {

//         state = action.payload;
//     }
// },
// editScene(state, action: PayloadAction<Partial<Scene>>) {
//     for (let field in action.payload) {
//         switch (field) {
//             case 'description':
//             case 'shortDescription':
//             case 'label':
//                 state[field] = action.payload[field] || state[field];
//                 break;
//             case 'editing':
//                 if (typeof action.payload.editing !== 'undefined') {
//                     state.editing =
//                         state.editable && action.payload.editing;
//                 }
//                 break;
//             case 'type':
//                 state.type = sceneTypes.reduce(
//                     (acc, typ) =>
//                         typ.key === action.payload.type ? typ.key : acc,
//                     state.type
//                 );
//                 break;
//             case 'attributes':
//                 const wantedAttr = action.payload.attributes?.shift();
//                 if (wantedAttr) {
//                     state.attributes = state.attributes.includes(
//                         wantedAttr
//                     )
//                         ? state.attributes.filter(
//                               (att) => att !== wantedAttr
//                           )
//                         : state.attributes.concat(wantedAttr);
//                 }
//                 break;
//         }
//     }
// },
// addRelated(state: Scene, action: PayloadAction<Partial<Scene>>) {
//     const scene = state;
//     state = { ...initialState };
//     state.attributes = scene.attributes;
//     state.editable = true;
//     state.editing = true;
//     state.id = 0;
//     if (typeof action.payload.parent !== 'undefined') {
//         state.parent = sceneAsReference(scene);
//     }
//     if (typeof action.payload.prev !== 'undefined') {
//         state.prev = sceneAsReference(scene);
//         state.next = scene.next;
//         state.parent = scene.parent;
//     }
// },

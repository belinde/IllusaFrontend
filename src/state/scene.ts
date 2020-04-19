import { Scene } from '../types';
import { GET, PUT } from '../ajax';

const LOCATION_SET = 'LOCATION_SET';

export const setScene = (scene: Scene) => ({
    type: LOCATION_SET,
    scene,
});

export const loadScene = (id: number = 1) => {
    console.log('loadScene', id);
    return GET('/scene/' + id, (scene) => setScene(scene));
};

export const updateScene = (scene: Scene) => {
    console.log('updateScene', scene);
    return PUT('/scene', scene, (scene: Scene) => setScene(scene));
};

export default (state: Scene, action: any): Scene => {
    switch (action.type) {
        case LOCATION_SET:
            return action.scene;
    }
    return (
        state || {
            id: 0,
            editable: false,
            parent: null,
            prev: null,
            next: null,
            children: [],
            type: 'cosmos',
            label: 'loading',
            description: '',
            attributes: [],
        }
    );
};

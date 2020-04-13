import { Location } from '../types';
import { GET } from '../ajax';

const LOCATION_SET = 'LOCATION_SET';

export const setLocation = (location: Location) => ({
    type: LOCATION_SET,
    location,
});

export const loadLocation = (id: number) => {
    console.log('loadLocation', id)
    return GET('/location/' + id, (location) => setLocation(location));
};

export default (state: Location, action: any) => {
    switch (action.type) {
        case LOCATION_SET:
            return action.location;
        default:
            if (!state) {
                return {};
            }
    }
    return state;
};

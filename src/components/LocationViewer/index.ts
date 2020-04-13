import { connect } from 'react-redux';
import { IllusaState } from '../../state';
import { LocationViewer } from './components/LocationViewer';
import { loadLocation } from '../../state/location';

export default connect(
    (state: IllusaState) => ({
        location: state.location,
    }),

    { loadLocation }
)(LocationViewer);

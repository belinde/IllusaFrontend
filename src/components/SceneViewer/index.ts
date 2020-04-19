import { connect } from 'react-redux';
import { IllusaState } from '../../state';
import { SceneViewer } from './components/SceneViewer';
import { loadScene } from '../../state/scene';

export default connect(
    (state: IllusaState) => ({
        scene: state.scene,
    }),

    { loadScene }
)(SceneViewer);

import { connect } from 'react-redux';
import { IllusaState } from '../..';
import { sceneAddRelated, sceneEdit } from '../../state/reducers/scene';
import React, { useEffect } from 'react';
import { Scene } from '../../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SceneReference from './components/SceneReference';
import SceneDetailForm from './components/SceneDetailForm';
import SceneDetailView from './components/SceneDetailView';
import Button from 'react-bootstrap/Button';
import { loadScene } from '../../features/scenes/slice';
import { selectScene } from '../../features/scenes/selectors';

const SceneViewer = ({
    scene,
    loadScene,
}: // createChild,
// createNext,
// startEditing,
// endEditing,
{
    scene: Scene;
    loadScene: (id: number) => void;
    // createChild: () => void;
    // createNext: () => void;
    // startEditing: () => void;
    // endEditing: () => void;
}) => {
    useEffect(() => {
        if (!scene) loadScene(1);
    }, [scene, loadScene]);

    if (!scene) return null;
    const endEditing = () => {};
    const startEditing = () => {};

    return (
        <Container>
            <Row>
                <Col>
                    <h6>Before</h6>
                    <SceneReference scene={scene.prev} loadScene={loadScene} />
                </Col>
                <Col>
                    <h6>Parent</h6>
                    <SceneReference
                        scene={scene.parent}
                        loadScene={loadScene}
                    />
                </Col>
                <Col>
                    <h6>After</h6>
                    <SceneReference scene={scene.next} loadScene={loadScene} />
                    {/* {scene.id > 0 ? (
                        <Button
                            variant="primary"
                            onClick={createNext}
                            size="sm"
                        >
                            {scene.next
                                ? 'Add something before'
                                : 'Add something'}
                        </Button>
                    ) : null} */}
                </Col>
            </Row>
            <Row>
                <Col xl="8" className="py-2">
                    {scene.editing ? (
                        <SceneDetailForm
                            scene={scene}
                            endEditing={endEditing}
                        />
                    ) : (
                        <SceneDetailView
                            scene={scene}
                            startEditing={startEditing}
                        />
                    )}
                </Col>
                <Col xl="4">
                    <h6>Contains:</h6>
                    {scene.children.map((loc) => (
                        <SceneReference
                            key={loc.id}
                            scene={loc}
                            loadScene={loadScene}
                        />
                    ))}
                    <div>
                        {/* {scene.id > 0 ? (
                            <Button
                                variant="primary"
                                onClick={createChild}
                                className="mt-3"
                                size="sm"
                            >
                                Add something
                            </Button>
                        ) : null} */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(
    (state: IllusaState) => ({
        scene: selectScene(state),
    }),
    {
        loadScene,
        // createChild: () => sceneAddRelated('parent'),
        // createNext: () => sceneAddRelated('prev'),
        // startEditing: () => sceneEdit({ editing: true }),
        // endEditing: () => sceneEdit({ editing: false }),
    }
)(SceneViewer);

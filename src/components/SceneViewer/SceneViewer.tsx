import { connect } from 'react-redux';
import { IllusaState } from '../..';
import React from 'react';
import { Scene } from '../../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SceneReference from './components/SceneReference';
import SceneDetailForm from './components/SceneDetailForm';
import SceneDetailView from './components/SceneDetailView';
import Button from 'react-bootstrap/Button';
import {
    loadScene,
    toggleEditMode,
    addRelated,
} from '../../features/scenes/slice';
import {
    selectScene,
    selectIsEditing,
    selectCurrentSceneId,
} from '../../features/scenes/selectors';

const SceneViewer = ({
    scene,
    defaultScene,
    editing,
    loadScene,
    toggleEditMode,
    addRelated,
}: {
    scene: Scene;
    defaultScene: number;
    editing: boolean;
    loadScene: (id: number) => void;
    addRelated: (currentSceneIs: 'parent' | 'prev') => void;
    toggleEditMode: () => void;
}) => {
    if (!scene) {
        loadScene(defaultScene);
        return null;
    }
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
                    {scene.parent?.editable ? (
                        <Button
                            variant="primary"
                            onClick={() => addRelated('prev')}
                            size="sm"
                        >
                            {scene.next
                                ? 'Add something before'
                                : 'Add something'}
                        </Button>
                    ) : null}
                </Col>
            </Row>
            <Row>
                <Col xl="8" className="py-2">
                    {editing ? (
                        <SceneDetailForm
                            scene={scene}
                            endEditing={toggleEditMode}
                        />
                    ) : (
                        <SceneDetailView
                            scene={scene}
                            startEditing={toggleEditMode}
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
                        {scene.editable ? (
                            <Button
                                variant="primary"
                                onClick={() => addRelated('parent')}
                                className="mt-3"
                                size="sm"
                            >
                                Add something
                            </Button>
                        ) : null}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(
    (state: IllusaState) => ({
        defaultScene: selectCurrentSceneId(state),
        scene: selectScene(state),
        editing: selectIsEditing(state),
    }),
    {
        loadScene,
        toggleEditMode: () => toggleEditMode(), // used onClick, if not wrapped will send the event as a payload
        addRelated: (currentSceneIs: 'parent' | 'prev') =>
            addRelated(currentSceneIs),
    }
)(SceneViewer);

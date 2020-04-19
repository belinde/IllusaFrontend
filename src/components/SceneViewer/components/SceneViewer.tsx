import React, { useCallback, useState } from 'react';
import { Scene } from '../../../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SceneReference from './SceneReference';
import SceneDetailForm from './SceneDetailForm';
import SceneDetailView from './SceneDetailView';

export const SceneViewer = ({
    scene,
    loadScene,
}: {
    scene: Scene;
    loadScene: (id: number) => void;
}) => {
    const [editing, setEditing] = useState(false);

    const startEditing = useCallback(() => {
        setEditing(true);
    }, [setEditing]);
    const endEditing = useCallback(() => {
        setEditing(false);
    }, [setEditing]);

    if (editing && !scene.editable) {
        setEditing(false);
    }

    if (!scene.id) return null;

    return (
        <Container>
            <Row>
                <Col>
                    <strong>Before</strong>
                    <SceneReference scene={scene.prev} loadScene={loadScene} />
                </Col>
                <Col>
                    <strong>Parent</strong>
                    <SceneReference
                        scene={scene.parent}
                        loadScene={loadScene}
                    />
                </Col>
                <Col>
                    <strong>After</strong>
                    <SceneReference scene={scene.next} loadScene={loadScene} />
                </Col>
            </Row>
            <Row>
                <Col xl="8" className="py-2">
                    {editing ? (
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
                    <strong>Contains:</strong>
                    {scene.children.map((loc) => (
                        <SceneReference
                            key={loc.id}
                            scene={loc}
                            loadScene={loadScene}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

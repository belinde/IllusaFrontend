import React from 'react';
import { SceneReference } from '../../../types';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default ({
    scene,
    loadScene,
}: {
    scene: SceneReference | null | undefined;
    loadScene: (id: number) => void;
}) => {
    if (scene)
        return (
            <Card className="mb-2">
                <Card.Body>
                    <Card.Title>
                        <Badge pill variant="info" className="float-right">
                            #{scene.id}
                        </Badge>
                        {scene.label}
                    </Card.Title>
                    <Card.Text>{scene.shortDescription}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button
                        onClick={() => loadScene(scene.id)}
                        variant="outline-dark"
                        className="float-right"
                        size="sm"
                    >
                        Go
                    </Button>
                    {scene.type}
                    {scene.attributes.length
                        ? ': ' + scene.attributes.join(', ')
                        : null}
                </Card.Footer>
            </Card>
        );
    return null;
};

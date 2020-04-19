import React from 'react';
import { Scene } from '../../../types';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default ({
    scene,
    startEditing,
}: {
    scene: Scene;
    startEditing: () => void;
}) => (
    <Card className="my-2">
        <Card.Body>
            <Card.Title>
                <Badge pill variant="info" className="float-right">
                    #{scene.id}
                </Badge>
                {scene.label}
            </Card.Title>
            <Card.Text>{scene.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
            {scene.editable ? (
                <Button
                    onClick={startEditing}
                    variant="primary"
                    className="float-right"
                    size="sm"
                >
                    Edit
                </Button>
            ) : null}
            {scene.type}
            {scene.attributes.length
                ? ': ' + scene.attributes.join(', ')
                : null}
        </Card.Footer>
    </Card>
);

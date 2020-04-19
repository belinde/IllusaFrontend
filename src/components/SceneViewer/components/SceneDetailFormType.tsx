import React from 'react';
import Form from 'react-bootstrap/Form';
import { sceneTypes } from '../../../resources';
import { SceneTypeSlug } from '../../../types';

export default ({
    type,
    onChange,
}: {
    type: SceneTypeSlug;
    onChange: (e: any) => void;
}) => (
    <Form.Group>
        <Form.Label>Scene type</Form.Label>
        {sceneTypes
            .filter((t) => t.userAvailable)
            .map((t) => (
                <Form.Check
                    key={t.key}
                    type="radio"
                    name="type"
                    checked={t.key === type}
                    value={t.key}
                    label={t.key + ': ' + t.description}
                    onChange={onChange}
                />
            ))}
    </Form.Group>
);

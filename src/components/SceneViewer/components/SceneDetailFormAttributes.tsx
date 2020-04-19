import React from 'react';
import Form from 'react-bootstrap/Form';
import { AttributeMeta } from '../../../types';

export default ({
    availableAttributes,
    currentAttributes,
    onChange,
}: {
    availableAttributes: AttributeMeta[];
    currentAttributes: string[];
    onChange: (e: any) => void;
}) => (
    <Form.Group>
        <Form.Label>Scene attributes</Form.Label>
        {availableAttributes.map((a) => (
            <Form.Check
                key={a.key}
                type="checkbox"
                name="attributes"
                checked={currentAttributes.includes(a.key)}
                onChange={onChange}
                value={a.key}
                label={a.key + ': ' + a.description}
            />
        ))}
    </Form.Group>
);

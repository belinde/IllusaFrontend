import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

export default ({
    value,
    onChange,
}: {
    value: string;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}) => (
    <Form.Group>
        <Form.Label>Short description</Form.Label>
        <Form.Control
            as="textarea"
            name="shortDescription"
            value={value}
            rows="4"
            onChange={onChange}
        />
        <Form.Text className="text-muted">
            The text shown in the connection links before entering in a scene.
        </Form.Text>
    </Form.Group>
);

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
        <Form.Label>Long description</Form.Label>
        <Form.Control
            as="textarea"
            name="description"
            value={value}
            rows="15"
            onChange={onChange}
        />
        <Form.Text className="text-muted">
            The main description of the scene. Unleash your fantasy!
        </Form.Text>
    </Form.Group>
);

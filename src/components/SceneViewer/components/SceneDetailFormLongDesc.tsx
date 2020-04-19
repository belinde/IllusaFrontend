import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
    longDescription,
    onChange,
}: {
    longDescription: string;
    onChange: (e: any) => void;
}) => (
    <Form.Group>
        <Form.Label>Long description</Form.Label>
        <Form.Control
            as="textarea"
            name="description"
            value={longDescription}
            rows="15"
            onChange={onChange}
        />
        <Form.Text className="text-muted">
            The main description of the scene. Unleash your fantasy!
        </Form.Text>
    </Form.Group>
);

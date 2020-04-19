import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({
    label,
    onChange,
}: {
    label: string;
    onChange: (e: any) => void;
}) => (
    <Form.Group>
        <Form.Label>Reference name</Form.Label>
        <Form.Control
            type="text"
            value={label}
            name="label"
            onChange={onChange}
        />
        <Form.Text className="text-muted">
            A reference name; keep it short, but descriptive.
        </Form.Text>
    </Form.Group>
);

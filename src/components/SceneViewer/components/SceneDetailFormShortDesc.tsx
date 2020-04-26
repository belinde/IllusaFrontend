import React from 'react';
import Form from 'react-bootstrap/Form';
import { IllusaState } from '../../../state';
import { connect } from 'react-redux';
import { sceneEdit } from '../../../state/scene';

const Component = ({
    shortDescription,
    onChange,
}: {
    shortDescription: string;
    onChange: (e: any) => void;
}) => (
    <Form.Group>
        <Form.Label>Short description</Form.Label>
        <Form.Control
            as="textarea"
            name="shortDescription"
            value={shortDescription}
            rows="4"
            onChange={onChange}
        />
        <Form.Text className="text-muted">
            The text shown in the connection links before entering in a scene.
        </Form.Text>
    </Form.Group>
);

export default connect(
    (state: IllusaState) => ({
        shortDescription: state.scene.shortDescription,
    }),
    {
        onChange: (e: any) => sceneEdit({ shortDescription: e.target.value }),
    }
)(Component);

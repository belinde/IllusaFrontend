import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { IllusaState } from '../../../state';
import { sceneEdit } from '../../../state/reducers/scene';

const Component = ({
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

export default connect(
    (state: IllusaState) => ({
        longDescription: state.scene.description,
    }),
    {
        onChange: (e: any) => sceneEdit({ description: e.target.value }),
    }
)(Component);

import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { IllusaState } from '../../../state';
import { sceneEdit } from '../../../state/scene';

const Component = ({
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

export default connect(
    (state: IllusaState) => ({
        label: state.scene.label,
    }),
    {
        onChange: (e: any) => sceneEdit({ label: e.target.value }),
    }
)(Component);

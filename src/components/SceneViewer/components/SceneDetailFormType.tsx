import React from 'react';
import Form from 'react-bootstrap/Form';
import { sceneTypes } from '../../../resources';
import { SceneTypeSlug } from '../../../types';
import { connect } from 'react-redux';
import { IllusaState } from '../../../state';
import { sceneEdit } from '../../../state/reducers/scene';

const Component = ({
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
                <Form.Check key={t.key}>
                    <Form.Check.Input
                        type="radio"
                        value={t.key}
                        onChange={onChange}
                        id={'scenetype_' + t.key}
                        checked={t.key === type}
                        name="type"
                    />
                    <Form.Check.Label htmlFor={'scenetype_' + t.key}>
                        {t.key}
                    </Form.Check.Label>
                    <Form.Text className="text-muted">
                        {t.description}
                    </Form.Text>
                </Form.Check>
            ))}
    </Form.Group>
);

export default connect(
    (state: IllusaState) => ({
        type: state.scene.type,
    }),
    {
        onChange: (e: any) => sceneEdit({ type: e.target.value }),
    }
)(Component);

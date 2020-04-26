import React from 'react';
import Form from 'react-bootstrap/Form';
import { AttributeMeta, Scene } from '../../../types';
import { connect } from 'react-redux';
import { IllusaState } from '../../../state';
import { sceneEdit } from '../../../state/scene';
import { attributes } from '../../../resources';

const Component = ({
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
            <Form.Check key={a.key}>
                <Form.Check.Input
                    type="checkbox"
                    value={a.key}
                    onChange={onChange}
                    id={'sceneattribute_' + a.key}
                    checked={currentAttributes.includes(a.key)}
                    name="attributes"
                />
                <Form.Check.Label htmlFor={'sceneattribute_' + a.key}>
                    {a.key}
                </Form.Check.Label>
                <Form.Text className="text-muted">{a.description}</Form.Text>
            </Form.Check>
        ))}
    </Form.Group>
);

const findAvailableAtributes = (scene: Scene) => {
    const parentAttrs = scene.parent?.attributes || [];
    return attributes.filter(
        (a) => a.availableIn === scene.type || parentAttrs.includes(a.key)
    );
};

export default connect(
    (state: IllusaState) => ({
        currentAttributes: state.scene.attributes,
        availableAttributes: findAvailableAtributes(state.scene),
    }),
    {
        onChange: (e: any) => sceneEdit({ attributes: [e.target.value] }),
    }
)(Component);

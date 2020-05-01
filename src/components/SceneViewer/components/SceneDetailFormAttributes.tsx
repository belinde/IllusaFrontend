import React, { useCallback, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { AttributeMeta } from '../../../types';

export default ({
    availableAttributes,
    currentAttributes,
    changeAttributes,
}: {
    availableAttributes: AttributeMeta[];
    currentAttributes: string[];
    changeAttributes: (attrs: string[]) => void;
}) => {
    const onChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) =>
            changeAttributes(
                currentAttributes.includes(evt.target.value)
                    ? currentAttributes.filter(
                          (att) => att !== evt.target.value
                      )
                    : currentAttributes.concat(evt.target.value)
            ),
        [changeAttributes, currentAttributes]
    );
    return (
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
                    <Form.Text className="text-muted">
                        {a.description}
                    </Form.Text>
                </Form.Check>
            ))}
        </Form.Group>
    );
};

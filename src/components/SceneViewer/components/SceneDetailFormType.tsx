import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { sceneTypes } from '../../../resources';

export default ({
    value,
    onChange,
}: {
    value: string;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}) => (
    <Form.Group>
        <Form.Label>Scene type</Form.Label>
        {sceneTypes
            .map((t) => (
                <Form.Check key={t.key}>
                    <Form.Check.Input disabled={value==='cosmos' || !t.userAvailable}
                        type="radio"
                        value={t.key}
                        onChange={onChange}
                        id={'scenetype_' + t.key}
                        checked={t.key === value}
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

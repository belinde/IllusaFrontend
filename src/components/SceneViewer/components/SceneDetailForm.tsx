import React, { useCallback, ChangeEvent, useState, FormEvent } from 'react';
import { Scene } from '../../../types';
import { sceneTypes, attributes } from '../../../resources';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormSceneLabel from './SceneDetailFormLabel';
import FormSceneType from './SceneDetailFormType';
import FormSceneAttributes from './SceneDetailFormAttributes';
import FormSceneShortDescription from './SceneDetailFormShortDesc';
import FormSceneLongDescription from './SceneDetailFormLongDesc';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { updateScene } from '../../../state/scene';
import { ActionCreator, AnyAction } from 'redux';

const SceneDetailForm = ({
    scene,
    updateScene,
    endEditing
}: {
    scene: Scene;
    updateScene: ActionCreator<AnyAction>;
    endEditing: () => void
}) => {
    const [editedScene, setEditedScene] = useState(scene);
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let s = { ...editedScene };
            const { name, value } = e.target;
            switch (name) {
                case 'label':
                case 'description':
                case 'shortDescription':
                    s[name] = value;
                    break;
                case 'type':
                    s.type = sceneTypes.reduce(
                        (acc, typ) => (typ.key === value ? typ.key : acc),
                        s.type
                    );
                    break;
                case 'attributes':
                    s.attributes = s.attributes.includes(value)
                        ? s.attributes.filter((att) => att !== value)
                        : s.attributes.concat(value);
                    break;
            }
            setEditedScene(s);
        },
        [editedScene, setEditedScene]
    );

    const applyChanges = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            endEditing();
            updateScene(editedScene);
        },
        [editedScene, endEditing, updateScene]
    );

    const parentAttrs = scene.parent?.attributes || [];
    const availableAttributes = attributes.filter(
        (a) => a.availableIn === editedScene.type || parentAttrs.includes(a.key)
    );

    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <Badge pill variant="info" className="float-right">
                        #{scene.id}
                    </Badge>
                    {scene.label}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={applyChanges}>
                    <FormSceneLabel
                        label={editedScene.label}
                        onChange={onChange}
                    />
                    <FormSceneType
                        type={editedScene.type}
                        onChange={onChange}
                    />
                    <FormSceneAttributes
                        currentAttributes={editedScene.attributes}
                        availableAttributes={availableAttributes}
                        onChange={onChange}
                    />
                    <FormSceneShortDescription
                        shortDescription={editedScene.shortDescription}
                        onChange={onChange}
                    />
                    <FormSceneLongDescription
                        longDescription={editedScene.description}
                        onChange={onChange}
                    />
                    <Form.Group>
                        <Button variant="primary" type="submit">Save</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer>
                {scene.type}
                {scene.attributes.length
                    ? ': ' + scene.attributes.join(', ')
                    : null}
            </Card.Footer>
        </Card>
    );
};

export default connect(null, { updateScene })(SceneDetailForm);

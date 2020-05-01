import React, { useCallback, FormEvent, useState, ChangeEvent } from 'react';
import { Scene } from '../../../types';
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
import { upsertScene } from '../../../features/scenes/slice';
import { attributes } from '../../../resources';

const SceneDetailForm = ({
    scene,
    upsertScene,
    endEditing,
}: {
    scene: Scene;
    upsertScene: (scene: Scene) => void;
    endEditing: () => void;
}) => {
    const [editedScene, setEditedScene] = useState(scene);
    if (editedScene.id !== scene.id) setEditedScene(scene);

    const applyChanges = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            endEditing();
            upsertScene(editedScene);
        },
        [editedScene, endEditing, upsertScene]
    );

    const changeFromEvent = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) =>
            setEditedScene({
                ...editedScene,
                [evt.target.name]: evt.target.value,
            }),
        [editedScene]
    );

    const changeAttributes = useCallback(
        (attributes: string[]) =>
            setEditedScene({
                ...editedScene,
                attributes,
            }),
        [editedScene]
    );
    const parentAttrs = scene.parent?.attributes || [];
    const availableAtributes = attributes.filter(
        (a) => a.availableIn === scene.type || parentAttrs.includes(a.key)
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
                        value={editedScene.label}
                        onChange={changeFromEvent}
                    />
                    <FormSceneType
                        value={editedScene.type}
                        onChange={changeFromEvent}
                    />
                    <FormSceneAttributes
                        availableAttributes={availableAtributes}
                        currentAttributes={editedScene.attributes}
                        changeAttributes={changeAttributes}
                    />
                    <FormSceneShortDescription
                        value={editedScene.shortDescription}
                        onChange={changeFromEvent}
                    />
                    <FormSceneLongDescription
                        value={editedScene.description}
                        onChange={changeFromEvent}
                    />
                    <Form.Group>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={endEditing}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="float-right"
                        >
                            Save
                        </Button>
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

export default connect(null, { upsertScene })(SceneDetailForm);

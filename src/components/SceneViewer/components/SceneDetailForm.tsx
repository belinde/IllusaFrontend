import React, { useCallback, FormEvent } from 'react';
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
import { upsertScene } from '../../../state/reducers/scene';
import { ActionCreator, AnyAction } from 'redux';

const SceneDetailForm = ({
    scene,
    upsertScene,
    endEditing,
}: {
    scene: Scene;
    upsertScene: ActionCreator<AnyAction>;
    endEditing: () => void;
}) => {
    const applyChanges = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            endEditing();
            upsertScene(scene);
        },
        [scene, endEditing, upsertScene]
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
                    <FormSceneLabel />
                    <FormSceneType />
                    <FormSceneAttributes />
                    <FormSceneShortDescription />
                    <FormSceneLongDescription />
                    <Form.Group>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={endEditing}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="float-right">
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

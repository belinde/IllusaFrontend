import React from 'react';
import { ActionCreator, AnyAction } from 'redux';
import { Location } from '../../../types';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default ({
    location,
    loadLocation,
}: {
    location: Location | null | undefined;
    loadLocation: ActionCreator<AnyAction>;
}) => {
    if (location)
        return (
            <Card className="my-2">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Header>
                    <Badge pill variant="info" className="float-right">#{location.id}</Badge>
                    {location.label}
                </Card.Header>
                <Card.Body>
                    <Card.Text>{location.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button
                        onClick={() => loadLocation(location.id)}
                        variant="outline-dark"
                        size="sm"
                    >
                        Go
                    </Button>
                </Card.Footer>
            </Card>
        );
    return null;
};

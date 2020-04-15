import React, { useCallback } from 'react';
import { Location } from '../../../types';
import { ActionCreator, AnyAction } from 'redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationReference from './LocationReference';

export const LocationViewer = ({
    location,
    loadLocation,
}: {
    location: Location;
    loadLocation: ActionCreator<AnyAction>;
}) => {
    console.log('ricalcolo locationviewer', location);

    const load = useCallback(loadLocation, [loadLocation]);

     if (!location.id) return null;

    return (
        <Container>
            <Row>
                <Col>
                    <strong>Before</strong>
                    <LocationReference
                        location={location.prev}
                        loadLocation={load}
                    />
                </Col>
                <Col>
                    <strong>Parent</strong>
                    <LocationReference
                        location={location.parent}
                        loadLocation={load}
                    />
                </Col>
                <Col>
                    <strong>After</strong>
                    <LocationReference
                        location={location.next}
                        loadLocation={load}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl="8">
                    <h2>
                        #{location.id} - {location.label}
                    </h2>
                    {location.description}
                </Col>
                <Col xl="4">
                    <strong>Contains:</strong>
                    {location.children.map((loc) => (
                        <LocationReference
                            key={loc.id}
                            location={loc}
                            loadLocation={load}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

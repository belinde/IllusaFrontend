import React, { useEffect, useCallback } from 'react';
import { Location } from '../../../types';
import { ActionCreator, AnyAction } from 'redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationDetail from './LocationDetail';

export const LocationViewer = ({
    location,
    loadLocation,
}: {
    location: Location;
    loadLocation: ActionCreator<AnyAction>;
}) => {
    console.log('ricalcolo locationviewer');

    useEffect(() => {
        loadLocation(1);
    }, [loadLocation]);

    const load = useCallback(loadLocation, [loadLocation]);

    if (!location.id) return null;

    return (
        <Container>
            <Row>
                <Col>
                <strong>Before</strong>
                <LocationDetail location={location.prev} loadLocation={load} />
                </Col>
                <Col>
                <strong>Parent</strong>
                <LocationDetail
                    location={location.parent}
                    loadLocation={load}
                />
                </Col>
                <Col>
                <strong>After</strong>
                <LocationDetail location={location.next} loadLocation={load} />
                </Col>
            </Row>
            <Row>
                <Col xl="8">
                <h2>#{location.id} - {location.label}</h2>
                {location.description}
                </Col>
                <Col xl="4">
                    <strong>From here:</strong>
                    {location.children.map((loc) => (
                    <LocationDetail
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

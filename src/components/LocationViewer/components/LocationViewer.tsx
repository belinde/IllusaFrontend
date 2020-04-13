import React, { useEffect } from 'react';
import { Location } from '../../../types';
import { ActionCreator, AnyAction } from 'redux';
import Button from 'react-bootstrap/Button';

const LocationDetail = ({
    location,
    loadLocation,
}: {
    location: Location | null | undefined;
    loadLocation: ActionCreator<AnyAction>;
}) => {
    if (location)
        return (
            <Button key={location.id} onClick={() => loadLocation(location.id)} variant="outline-dark" className="m-1">
                #{location.id} - {location.label}
            </Button>
        );
    return null;
};

export const LocationViewer = ({
    location,
    loadLocation,
}: {
    location: Location;
    loadLocation: ActionCreator<AnyAction>;
}) => {
    useEffect(() => {
        console.log('Location viewer - use effect');
        loadLocation(1);
    }, [loadLocation]);

    if (!location.id) return null;

    console.log(location);

    return (
        <div>
            <div>Qui: #{location.id} - {location.label}</div>
            <div>
                Sopra:{' '}
                <LocationDetail
                    location={location.parent}
                    loadLocation={loadLocation}
                />
            </div>
            <div>
                Prima:{' '}
                <LocationDetail
                    location={location.prev}
                    loadLocation={loadLocation}
                />
            </div>
            <div>
                dopo:{' '}
                <LocationDetail
                    location={location.next}
                    loadLocation={loadLocation}
                />
            </div>
            <div>
            Figli:
            {location.children.map((loc) => (
                <LocationDetail
                    location={loc}
                    loadLocation={loadLocation}
                />
            ))}
            </div>
        </div>
    );
};

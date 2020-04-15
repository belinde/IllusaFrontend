export interface User {
    displayName: string;
    id?: number;
    email?: string;
    roles?: string[];
    token?: string;
    errorMessage?: string;
}

export type LocationType = 'cosmos' | 'plane' | 'region'

export interface LocationReference {
    id: number;
    type: LocationType;
    label: string;
    description: string;
    attributes: string[];
}

export interface Location extends LocationReference {
    editable: boolean;
    parent: LocationReference;
    prev: LocationReference | null;
    next: LocationReference | null;
    children: LocationReference[];
}

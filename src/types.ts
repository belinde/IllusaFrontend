export interface User {
    id: number | null;
    displayName: string | null;
    email: string | null;
    roles: string[];
    token: string | null;
    errorMessage?: string;
}

export interface SceneReference {
    id: number;
    type: SceneTypeSlug;
    label: string;
    shortDescription: string;
    attributes: string[];
}

export interface Scene extends SceneReference {
    description: string;
    editable: boolean;
    editing: boolean;
    parent: SceneReference | null;
    prev: SceneReference | null;
    next: SceneReference | null;
    children: SceneReference[];
}

export type SceneTypeSlug = 'cosmos' | 'plane' | 'region';

export interface SceneTypeMeta {
    key: SceneTypeSlug;
    userAvailable: boolean;
    description: string;
}

export interface AttributeMeta {
    key: string;
    availableIn: SceneTypeSlug;
    description: string;
}

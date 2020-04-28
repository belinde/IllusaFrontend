export interface User {
    id: number | null;
    displayName: string | null;
    email: string | null;
    roles: string[];
}

export interface SceneBreadcrumb {
    id: number;
    label: string;
}

export interface SceneReference {
    id: number;
    label: string;
    type: SceneTypeSlug;
    shortDescription: string;
    attributes: string[];
}

export interface Scene {
    id: number;
    label: string;
    type: SceneTypeSlug;
    shortDescription: string;
    attributes: string[];
    description: string;
    editable: boolean;
    editing: boolean;
    parent: SceneReference | null;
    prev: SceneReference | null;
    next: SceneReference | null;
    children: SceneReference[];
}

export const sceneAsReference = (scene: Scene): SceneReference => ({
    // id: scene.id,
    id:0,
    type: scene.type,
    shortDescription: scene.shortDescription,
    label: scene.label,
    attributes: scene.attributes,
});

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

export interface User {
    displayName: string;
    id?: number;
    email?: string;
    roles?: string[];
    token?: string;
    errorMessage?: string
}

export interface Location {
        id: number;
        label: string,
        description: string|null
        attributes: string[],
        size: number,
        contains: number,
        parent?: Location|null,
        prev?: Location|null,
        next?: Location|null,
        children: Location[]
}
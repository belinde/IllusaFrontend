export interface User {
    displayName: string;
    id?: number;
    email?: string;
    roles?: string[];
    token?: string;
    errorMessage?: string
}

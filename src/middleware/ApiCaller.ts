import { Middleware, AnyAction, ActionCreator } from 'redux';

const BASE_URL = 'http://localhost:8000';

export const API_CALL = 'API_CALL';

let headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const setToken = (token: string | null) => {
    if (token) {
        headers = {
            ...headers,
            Authorization: 'bearer ' + token,
        };
    } else {
        let { Authorization, ...otherHeaders } = headers;
        headers = otherHeaders;
    }
};

export interface ApiCallAction {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    content?: any;
    success?: ActionCreator<AnyAction>;
    failure?: ActionCreator<AnyAction>;
}

export const ApiCaller: Middleware = (store) => (next) => (action) => {
    console.log('Action dispatched:', action.type, action);
    if (action.type === API_CALL) {
        apiCall(action.method, action.path, action.content)
            .then((decoded) => {
                console.info('ApiCaller - success', decoded);
                if (action.success) {
                    store.dispatch(action.success(decoded));
                }
            })
            .catch((error) => {
                console.error('ApiCaller - error', error);
                if (action.failure) {
                    store.dispatch(action.failure(error));
                }
            });
    }
    return next(action);
};

export const apiCall = (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    content: any = null
) =>
    fetch(BASE_URL + path, {
        method,
        headers,
        body: content ? JSON.stringify(content) : null,
    }).then((response) => response.json());

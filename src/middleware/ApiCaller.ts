import { Middleware, AnyAction, ActionCreator } from 'redux';

const BASE_URL = 'http://localhost:8000';

export const API_CALL = 'API_CALL';

let headers: Record<string, string> = {
    'Accept': 'application/json',
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

export interface ApiCallAction extends AnyAction {
    type: 'API_CALL';
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    content?: any;
    success?: ActionCreator<AnyAction>;
    failure?: ActionCreator<AnyAction>;
}

export const ApiCaller: Middleware = (store) => (next) => (action) => {
    console.log('Action dispatched:', action.type, action);
    if (action.type === API_CALL) {
        fetch(BASE_URL + action.path, {
            method: action.method,
            headers,
            body: action.content ? JSON.stringify(action.content) : null,
        })
            .then((response) => response.json())
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

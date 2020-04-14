import { Middleware, AnyAction, ActionCreator } from 'redux';

const BASE_URL = 'https://localhost:8000';

export const API_CALL = 'API_CALL';

let headers:Record<string,string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const setToken = (token: string | null) => {
    if (token) {
        headers = {
            Authentication: 'bearer ' + token,
            ...headers
        };
    } else {
        let {Authentication, ...otherHeaders} = headers;
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

export const ApiCaller: Middleware = (store) => (next) => (
    action: ApiCallAction | AnyAction
) => {
    switch (action.type) {
        case API_CALL:
            console.info('ApiCaller', action);
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
            break;
    }
    return next(action);
};

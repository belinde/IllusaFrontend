import { Middleware, AnyAction, ActionCreator } from 'redux';
import { USER_SET, USER_UNSET } from '../state/user';

const BASE_URL = 'https://localhost:8000';

export const API_CALL = 'API_CALL';

export interface ApiCallAction extends AnyAction {
    type: 'API_CALL';
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    content?: any;
    success?: ActionCreator<AnyAction>;
    failure?: ActionCreator<AnyAction>;
}

let headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const ApiCaller: Middleware = (store) => (next) => (
    action: ApiCallAction | AnyAction
) => {
    switch (action.type) {
        case API_CALL:
            fetch(BASE_URL + action.path, {
                method: action.method,
                headers,
                body: JSON.stringify(action.content),
            })
                .then((response) => response.json())
                .then((decoded) => {
                    if (action.success) {
                        store.dispatch(action.success(decoded));
                    }
                })
                .catch((error) => {
                    if (action.failure) {
                        store.dispatch(action.failure(error));
                    }
                });
            break;
        case USER_SET:
            headers['Authorization'] = 'bearer ' + action.token;
            break;
        case USER_UNSET:
            delete headers['Authorization'];
            break;
    }
    return next(action);
};

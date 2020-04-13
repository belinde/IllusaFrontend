import { Middleware, AnyAction, ActionCreator } from 'redux';

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

export const ApiCaller: Middleware = (store) => (next) => (
    action: ApiCallAction
) => {
    if (action.type === API_CALL) {
        fetch(BASE_URL + action.path, {
            method: action.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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
    }
    return next(action);
};

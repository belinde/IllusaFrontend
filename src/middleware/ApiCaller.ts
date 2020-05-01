import { Middleware, AnyAction, ActionCreator } from 'redux';
import { createAction } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8000';

export const ajaxCall = createAction(
    'api_call',
    (
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        path: string,
        content?: any,
        success?: ActionCreator<AnyAction>,
        failure?: ActionCreator<AnyAction>
    ) => {
        if (content && (method === 'GET' || method === 'DELETE')) {
            path = path + '?' + new URLSearchParams(content).toString();
            content = null;
        }
        return {
            payload: { method, path, content, success, failure },
        };
    }
);

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

export const ApiCaller: Middleware = (store) => (next) => (action) => {
    console.log('Action dispatched:', action.type, action);
    if (ajaxCall.match(action)) {
        const { method, path, content, success, failure } = action.payload;
        apiCall(method, path, content)
            .then((decoded) => {
                console.info('ApiCaller - success', decoded);
                if (success) {
                    store.dispatch(success(decoded));
                }
            })
            .catch((error) => {
                console.error('ApiCaller - error', error);
                if (failure) {
                    store.dispatch(failure(error));
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

import { ActionCreator, AnyAction } from 'redux';
import { ApiCallAction, API_CALL } from './middleware/ApiCaller';
import { createAction, PrepareAction } from '@reduxjs/toolkit';

const aGET = createAction<PrepareAction<ApiCallAction>>(
    API_CALL,
    (
        path: string,
        success?: ActionCreator<AnyAction>,
        failure?: ActionCreator<AnyAction>
    ) => ({
        payload: {
            method: 'GET',
            path,
            content: null,
            success,
            failure,
        },
    })
);
aGET()

export const GET = (
    path: string,
    success?: ActionCreator<AnyAction>,
    failure?: ActionCreator<AnyAction>
): ApiCallAction => ({
    method: 'GET',
    path,
    content: null,
    success,
    failure,
});

export const POST = (
    path: string,
    content: any,
    success?: ActionCreator<AnyAction>,
    failure?: ActionCreator<AnyAction>
): ApiCallAction => ({
    method: 'POST',
    path,
    content,
    success,
    failure,
});

export const PUT = (
    path: string,
    content: any,
    success?: ActionCreator<AnyAction>,
    failure?: ActionCreator<AnyAction>
): ApiCallAction => ({
    method: 'PUT',
    path,
    content,
    success,
    failure,
});

export const DELETE = (
    path: string,
    success?: ActionCreator<AnyAction>,
    failure?: ActionCreator<AnyAction>
): ApiCallAction => ({
    method: 'DELETE',
    path,
    content: null,
    success,
    failure,
});

import { ActionCreator, AnyAction } from "redux";
import { ApiCallAction, API_CALL } from "./middleware/ApiCaller";

export const GET = (
    path: string,
    success?: ActionCreator<AnyAction>,
    failure?: ActionCreator<AnyAction>
): ApiCallAction => ({
    type: API_CALL,
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
    type: API_CALL,
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
    type: API_CALL,
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
    type: API_CALL,
    method: 'DELETE',
    path,
    content: null,
    success,
    failure,
});
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';

import { combineReducers } from 'redux';
import scenesReducer from './features/scenes/slice';
import userReducer from './features/login/slice';

const reducer = combineReducers({
    user: userReducer,
    scenes: scenesReducer,
});

export type IllusaState = ReturnType<typeof reducer>;

const store = configureStore({
    reducer,
    // middleware: [...getDefaultMiddleware(), ApiCaller],
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

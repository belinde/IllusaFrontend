import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import { IllusaReducer } from './state';
import { ApiCaller } from './middleware/ApiCaller';

const store = createStore(IllusaReducer, applyMiddleware(ApiCaller));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

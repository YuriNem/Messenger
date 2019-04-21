import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './style.scss';

import AppContainer from './containers/App.js';

const initState = {
    error: '',
    username: '',
    dialogues: [],
    messages: [],
};

const store = createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(thunk)),
);

const renderDiv = document.getElementById('render');

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </Router>,
    renderDiv,
);

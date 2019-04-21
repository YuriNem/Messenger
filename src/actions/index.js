import { createAction } from 'redux-actions';

import axios from 'axios';
import 'babel-polyfill';

const url = location.href.slice(0, location.href.length - 1).split('//')[1];
const socket = new WebSocket(`ws://${url}`);

export const setError = createAction('SET_ERROR');
export const setUser = createAction('SET_USER');

export const asyncIsAvailableUsername = ({ username }) =>
    async (dispatch) => {
        const result = await axios.post(
            '/username',
            { username },
        );

        dispatch(setError({ error: result.data }));
    };

export const asyncSign = ({ action, email, password, username }) =>
    async (dispatch) => {
        const result = await axios.post(
            `/${action.toLowerCase().replace(' ', '')}`,
            { email, password, username },
        );

        if (result.data.error) {
            dispatch(setError({ error: result.data.error }));
        } else {
            dispatch(setUser({
                username: result.data.username,
                dialogues: result.data.dialogues,
            }));
            dispatch(setError({ error: '' }));
        }
    };

export const setMessages = createAction('SET_MESSAGES');

export const asyncGetMessages = ({ username: username2 }) =>
    async (dispatch, getState) => {
        const { username: username1 } = getState();
        const result = await axios.post(
            '/messages',
            { username1, username2 },
        );

        dispatch(setMessages({ messages: result.data }));
    };

export const addMessage = createAction('ADD_MESSAGE');
export const asyncSendMessage = ({ username: username2, text }) =>
    async (dispatch, getState) => {
        const { username: username1 } = getState();
        await socket.send(JSON.stringify({ username1, username2, text })),

        dispatch(addMessage({ username: username1, text }));
    };

socket.onmessage = function(event) {
    var incomingMessage = event.data;
    console.log(incomingMessage);
};

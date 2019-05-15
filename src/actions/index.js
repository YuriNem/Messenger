import { createAction } from 'redux-actions';

import axios from 'axios';
import 'babel-polyfill';

const HOST = location.origin.replace(/^http/, 'ws');
const socket = new WebSocket(HOST);
socket.onopen = () => console.log('WS ONLINE');

socket.onmessage = event => {
    const data = JSON.parse(event.data);
    localStorage.setItem('id', String(data.id));
};

export const setError = createAction('SET_ERROR');
export const setUser = createAction('SET_USER');
export const addMessage = createAction('ADD_MESSAGE');
export const removeUsername = createAction('REMOVE_USERNAME');
export const addDialogue = createAction('ADD_DIALOGUE');
export const setUsernames = createAction('SET_USERNAMES');
export const setMessages = createAction('SET_MESSAGES');
export const showAlert = createAction('SHOW_ALERT');
export const removeAlert = createAction('REMOVE_ALERT');

export const asyncIsAvailableUsername = ({ username }) =>
    async (dispatch) => {
        const result = await axios.post(
            '/username',
            { username },
        );

        dispatch(setError({ error: result.data }));
    };

export const asyncSign = ({ action, email, password, username }) =>
    async (dispatch, getState) => {
        const result = await axios.post(
            `/${action.toLowerCase().replace(' ', '')}`,
            { email, password, username, id: Number(localStorage.getItem('id')) },
        );

        if (result.data.error) {
            dispatch(setError({ error: result.data.error }));
        } else {
            dispatch(setUser({
                username: result.data.username,
                dialogues: result.data.dialogues,
            }));

            localStorage.setItem('user', JSON.stringify({
                username: result.data.username,
                dialogues: result.data.dialogues,
            }));

            dispatch(setError({ error: '' }));

            socket.onmessage = event => {
                const { username1: username, text } = JSON.parse(event.data);
                const { dialogues, openDialogue } = getState();

                dispatch(showAlert({ username, text }));

                if (!dialogues.includes(username)) {
                    dispatch(addDialogue({ username }));
                }

                if (openDialogue === username) {
                    dispatch(addMessage({ username, text }));
                }
            }
        }
    };

export const asyncRemoveUsername = () =>
    dispatch => {
        localStorage.removeItem('user');

        dispatch(removeUsername());
    };

export const asyncSendMessage = ({ username: username2, text }) =>
    async (dispatch, getState) => {
        const { username: username1 } = getState();
        await socket.send(JSON.stringify({
            username1,
            username2,
            text,
            id: localStorage.getItem('id'),
        }));
    
        dispatch(addMessage({ username: username1, text }));
    };

export const asyncGetMessages = ({ username: username2 }) =>
    async (dispatch, getState) => {
        const { username: username1 } = getState();
        const result = await axios.post(
            '/messages',
            { username1, username2 },
        );

        dispatch(setMessages({ messages: result.data, openDialogue: username2 }));
    };

export const asyncGetUsernames = () =>
    async (dispatch) => {
        const result = await axios.get('/usernames');

        dispatch(setUsernames({ usernames: result.data }));
    };

export const asyncAddDialogue = ({ username: username2 }) =>
    async (dispatch, getState) => {
        const { username: username1 } = getState();
        await axios.post(
            '/dialogue',
            { username1, username2 },
        );

        dispatch(addDialogue({ username: username2 }));
    };

export const asyncRemoveAlert = () =>
    dispatch => {
        dispatch(removeAlert());
    };

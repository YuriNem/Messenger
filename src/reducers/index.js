import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { combineReducers } from 'redux';

const error = handleActions({
    [actions.setError](state, { payload: { error } }) {
        return error;
    },
}, '');

const username = handleActions({
    [actions.setUser](state, { payload: { username } }) {
        return username;
    },
    [actions.removeUsername](state) {
        return '';
    },
}, '');

const dialogues = handleActions({
    [actions.setUser](state, { payload: { dialogues } }) {
        return dialogues;
    },
    [actions.addDialogue](state, { payload: { username } }) {
        return [...state, username];
    },
}, []);

const messages = handleActions({
    [actions.setMessages](state, { payload: { messages } }) {
        return messages;
    },
    [actions.addMessage](state, { payload: { username, text } }) {
        return [...state, { username, text }];
    }
}, []);

const usernames = handleActions({
    [actions.setUsernames](state, { payload: { usernames } }) {
        return usernames;
    },
}, []);

const openDialogue = handleActions({
    [actions.setMessages](state, { payload: { openDialogue } }) {
        return openDialogue;
    },
}, '');

const alert = handleActions({
    [actions.showAlert](state, { payload: { username, text } }) {
        return { username, text };
    },
    [actions.removeAlert](state) {
        return null;
    },
}, null);

export default combineReducers({
    error,
    username,
    dialogues,
    messages,
    usernames,
    openDialogue,
    alert,
});

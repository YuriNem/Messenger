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
}, '');

const dialogues = handleActions({
    [actions.setUser](state, { payload: { dialogues } }) {
        return dialogues;
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

export default combineReducers({
    error,
    username,
    dialogues,
    messages,
});

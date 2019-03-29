import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { combineReducers } from 'redux';

const formType = handleActions({
    [actions.clickFormType](state, { payload: { formType } }) {
        return formType;
    },
}, 'Sign in');

const email = handleActions({
    [actions.changeEmail](state, { payload: { email } }) {
        return email;
    },
    [actions.clickFormType](state, { payload: { formType } }) {
        return '';
    },
}, '');

const password = handleActions({
    [actions.changePassword](state, { payload: { password } }) {
        return password;
    },
    [actions.clickFormType](state, { payload: { formType } }) {
        return '';
    },
}, '');

export default combineReducers({
    formType,
    email,
    password,
});

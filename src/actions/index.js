import { createAction } from 'redux-actions';
import axios from 'axios';
const socket = new WebSocket("ws://localhost:8081");

import 'babel-polyfill';

export const submitForm = createAction('CLICK__FORMTYPE');
export const asyncSubmitForm = event => async (dispatch, getState) => {
    event.preventDefault();

    const { formType, email, password } = getState();
    const result = await axios.post(`/${formType.toLowerCase().replace(' ', '')}`, { email, password });
    console.log(result.data);
};

export const clickFormType = createAction('CLICK__FORMTYPE');
export const asyncClickFormType = ({ formType }) => async (dispatch) => dispatch(clickFormType({ formType }));

export const changeEmail = createAction('CHANGE_EMAIL');
export const asyncChangeEmail = ({ email }) => async (dispatch) => dispatch(changeEmail({ email }));

export const changePassword = createAction('CHANGE_PASSWORD');
export const asyncChangePassword = ({ password }) => async (dispatch) => dispatch(changePassword({ password }));

import React from 'react';
import axios from 'axios';

import 'babel-polyfill';

import './style.scss';

export default class App extends React.Component {
    state = {
        formType: 'Sign in',
        email: '',
        password: '',
    }

    onSubmitForm = formType => async event => {
        event.preventDefault();

        const { email, password } = this.state;
        await axios.post(`/${formType.toLowerCase().replace(' ', '')}`, { email, password });
    }

    onClickFormType = formType => event => {
        event.preventDefault();

        this.setState({ formType, email: '', password: '' });
    }

    onChangeEmail = event => {
        this.setState({ email: event.target.value });
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    render() {
        const { formType, email, password } = this.state;

        return (
            <form className="app" onSubmit={this.onSubmitForm(formType)}>
                {
                    formType === 'Sign in' ?
                    <label className="app__label">
                        Sign in / <a className="app__link" onClick={this.onClickFormType('Sign up')}>Sign up</a>
                    </label>
                    :
                    <label className="app__label">
                        <a className="app__link" onClick={this.onClickFormType('Sign in')}>Sign in</a> / Sign up
                    </label>
                }
                <input 
                className="app__input" 
                value={email} 
                onChange={this.onChangeEmail} 
                placeholder="Email" 
                type="email" 
                />
                <input 
                className="app__input" 
                value={password} 
                onChange={this.onChangePassword} 
                placeholder="Password" 
                type="password" 
                />
                <button className="app__button">{formType}</button>
            </form>
        );
    }
}

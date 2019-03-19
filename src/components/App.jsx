import React from 'react';

import './style.scss';

export default class App extends React.Component {
    state = {
        formType: 'Sign in',
        email: '',
        password: '',
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
            <form className="app">
                {
                    formType === 'Sign in' ?
                    <label className="app__label">
                        Sign in / <a className="app__link" onClick={this.onClickFormType('Log in')}>Log in</a>
                    </label>
                    :
                    <label className="app__label">
                        <a className="app__link" onClick={this.onClickFormType('Sign in')}>Sign in</a> / Log in
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
            </form>
        );
    }
}

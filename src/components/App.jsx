import React from 'react';

import './style.scss';

export default class App extends React.Component {
    render() {
        const { 
            formType, 
            email, 
            password, 
            asyncSubmitForm, 
            asyncClickFormType, 
            asyncChangeEmail, 
            asyncChangePassword, 
        } = this.props;

        return (
            <form className="app" onSubmit={event => asyncSubmitForm(event)}>
                {
                    formType === 'Sign in' ?
                    <label className="app__label">
                        Sign in / <a 
                        className="app__link" 
                        onClick={() => asyncClickFormType({ formType: 'Sign up' })}
                        >Sign up</a>
                    </label>
                    :
                    <label className="app__label">
                        <a 
                        className="app__link" 
                        onClick={() => asyncClickFormType({ formType: 'Sign in' })}
                        >Sign in</a> / Sign up
                    </label>
                }
                <input 
                className="app__input" 
                value={email} 
                onChange={event => asyncChangeEmail({ email: event.target.value })} 
                placeholder="Email" 
                type="email" 
                />
                <input 
                className="app__input" 
                value={password} 
                onChange={event => asyncChangePassword({ password: event.target.value })} 
                placeholder="Password" 
                type="password" 
                />
                <button className="app__button">{formType}</button>
            </form>
        );
    }
}

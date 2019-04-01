import React from 'react';

import './style.scss';

const Form = ({
    formType,
    email,
    password,
    asyncClickFormType,
    asyncChangeEmail,
    asyncChangePassword,
    asyncSubmitForm,
}) => {
    return (
        <form className="form" onSubmit={event => asyncSubmitForm(event)}>
            {
                formType === 'Sign in' ?
                <label className="form__label">
                    Sign in / <a
                    className="form__link"
                    onClick={() => asyncClickFormType({ formType: 'Sign up' })}
                    >Sign up</a>
                </label>
                :
                <label className="form__label">
                    <a
                    className="form__link"
                    onClick={() => asyncClickFormType({ formType: 'Sign in' })}
                    >Sign in</a> / Sign up
                </label>
            }
            <input
            className="form__input"
            value={email}
            onChange={event => asyncChangeEmail({ email: event.target.value })}
            placeholder="Email"
            type="email"
            />
            <input
            className="form__input"
            value={password}
            onChange={event => asyncChangePassword({ password: event.target.value })}
            placeholder="Password"
            type="password"
            />
            <button className="form__button">{formType}</button>
        </form>
    );
}

export default Form;

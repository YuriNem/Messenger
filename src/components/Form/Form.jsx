import React from 'react';

import './Form.scss';

class Form extends React.Component {
    state = {
        action: 'Sign in',
        email: '',
        password: '',
        username: '',
        error: '',
    }

    componentDidUpdate(prevProps, prevState) {
        const { error, asyncIsAvailableUsername } = this.props;
        const { error: prevError } = prevProps;

        if (error !== prevError) {
            if (error === 'Confirm email') {
                this.setState({
                    error,
                    action: 'Sign in',
                    email: '',
                    password: '',
                    username: '', 
                });
            } else {
                this.setState({ error });
            }
        }

        const { action, username } = this.state;
        const { action: prevAction } = prevState;

        if (action !== prevAction && username) {
            asyncIsAvailableUsername({ username });
        }
    }

    onSubmitForm = event => {
        event.preventDefault();

        const { action, email, password, username, error } = this.state;
        const { error: errorProps, asyncSign } = this.props;

        if (action === 'Sign in' && email && password) {
            asyncSign({ action, email, password });
        } else if (
            action === 'Sign up' &&
            email &&
            password &&
            username &&
            !error &&
            !errorProps
        ) {
            asyncSign({ action, email, password, username });
        } else if (action === 'Sign in') {
            this.setState({ error: 'Blank fields' });
        } else {
            if (email && password && username) {
                this.setState({ error: errorProps || 'Blank fields' });
            } else {
                this.setState({ error: 'Blank fields' });
            }
        }
    }

    onClickChangeAction = action => () => {
        this.setState({ action, error: '' });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    }

    onChangeUsername = event => {
        const { asyncIsAvailableUsername } = this.props;

        this.onChange(event);
        asyncIsAvailableUsername({ username: event.target.value });
    }

    render() {
        const { action, email, password, username, error } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmitForm}>
                <div className="form__error">{error}</div>
                {
                    action === 'Sign in' ?
                        <label className="form__label">
                            Sign in / <a
                                className="form__link"
                                onClick={this.onClickChangeAction('Sign up')}
                            >Sign up</a>
                        </label>
                    :
                        <label className="form__label">
                            <a
                                className="form__link"
                                onClick={this.onClickChangeAction('Sign in')}
                            >Sign in</a> / Sign up
                        </label>
                }
                <input
                    className="form__input"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="Email"
                    type="email"
                />
                <input
                    className="form__input"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    placeholder="Password"
                    type="password"
                />
                {
                    action === 'Sign up' ?
                        <input
                            className="form__input"
                            name="username"
                            value={username}
                            onChange={this.onChangeUsername}
                            placeholder="Username"
                            type="text"
                        />
                    :
                        null
                }
                <button className="form__button">{action}</button>
            </form>
        );
    }
}

export default Form;

import React from 'react';

import './ChatForm.scss';

class ChatForm extends React.Component {
    state = {
        input: '',
    }

    onChangeInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitForm = event => {
        event.preventDefault();

        const { input } = this.state;
        const { username, asyncSendMessage } = this.props;

        if (input) {
            asyncSendMessage({ username, text: input });
            this.setState({ input: '' });
        }
    }

    render() {
        const { input } = this.state;

        return (
            <form className="chat-form" onSubmit={this.onSubmitForm}>
                <input
                    className="chat-form__input"
                    name="input"
                    type="text"
                    value={input}
                    onChange={this.onChangeInput}
                    placeholder="Write a message..."
                    autoComplete="off"
                />
                <button className="chat-form__button">Send</button>
            </form>
        );
    }
}

export default ChatForm;

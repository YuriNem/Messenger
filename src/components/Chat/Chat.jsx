import React from 'react';

import './style.scss';

const Chat = ({ messages, message, asyncChangeMessage }) => {
    return (
        <div className="chat">
            <div className="chat__messages">{messages}</div>
            <div className="chat__form">
                <input
                className="chat__input"
                value={message}
                onChangeMessage={
                    event => asyncChangeMessage({ message: event.target.value })
                }
                placeholder="Write a message..."
                type="text"
                />
                <button className="chat__button">Send</button>
            </div>
        </div>
    );
}

export default Chat;

import React from 'react';

import './Messages.scss';

import Message from '../Message/Message.jsx';

const Messages = ({ messages }) => {
    return (
        <div className="messages">
            {
                messages.map(({ username, text }) =>
                    <Message
                        username={username}
                        text={text}
                        key={Math.random()}
                    />
                )
            }
        </div>
    );
}

export default Messages;

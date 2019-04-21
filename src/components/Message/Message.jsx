import React from 'react';

import './Message.scss';

const Message = ({ username, text }) => {
    return (
        <div className="message">
            <div className="message__username">{username}</div>
            <div className="message__text">{text}</div>
        </div>
    );
}

export default Message;

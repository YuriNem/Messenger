import React from 'react';

import './Message.scss';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.message = React.createRef();
    }

    componentDidMount() {
        this.message.current.scrollIntoView(true);
    }

    render() {
        const { username, text } = this.props;

        return (
            <div className="message" ref={this.message}>
                <div className="message__username">{username}</div>
                <div className="message__text">{text}</div>
            </div>
        );
    }
}

export default Message;

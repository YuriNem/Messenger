import React from 'react';

import './Chat.scss';

import MessagesContainer from '../../containers/Messages.js';
import ChatFormContainer from '../../containers/ChatForm.js';

class Chat extends React.Component {
    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps) {
        const {
			match: {
				params: { username },
            },
        } = this.props;
        const {
			match: {
				params: { username: prevUsername },
            },
        } = prevProps;
        
        if (username !== prevUsername) {
            this.getMessages();
        }
    }

    getMessages() {
        const {
            asyncGetMessages,
			match: {
				params: { username },
            },
        } = this.props;
        
        asyncGetMessages({ username });
    }

    render() {
        const {
			match: {
				params: { username },
            },
        } = this.props;

        return (
            <div className="chat">
                <MessagesContainer />
                <ChatFormContainer username={username} />
            </div>
        );
    }
}

export default Chat;

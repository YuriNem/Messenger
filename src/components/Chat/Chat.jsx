import React from 'react';

import './Chat.scss';

import MessagesContainer from '../../containers/Messages.js';
import ChatFormContainer from '../../containers/ChatForm.js';

class Chat extends React.Component {
    state = {
        loaded: false,
    }

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
            this.setState({ loaded: false });
            this.getMessages();
        }
    }

    async getMessages() {
        const {
            asyncGetMessages,
			match: {
				params: { username },
            },
        } = this.props;
        
        await asyncGetMessages({ username });
        this.setState({ loaded: true });
    }

    render() {
        const { loaded } = this.state;
        const {
			match: {
				params: { username },
            },
        } = this.props;

        return (
            <div className="chat">
                {loaded ? <MessagesContainer /> : <div className="chat__loading"></div>}
                <ChatFormContainer username={username} />
            </div>
        );
    }
}

export default Chat;

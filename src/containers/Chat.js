import { connect } from 'react-redux';
import { asyncGetMessages } from '../actions';

import Chat from '../components/Chat/Chat.jsx';

const mapStateToProps = () => ({});

const ChatContainer = 
    connect(mapStateToProps, { asyncGetMessages })(Chat);

export default ChatContainer;

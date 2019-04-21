import { connect } from 'react-redux';
import { asyncSendMessage } from '../actions';

import ChatForm from '../components/ChatForm/ChatForm.jsx';

const mapStateToProps = () => ({});

const ChatFormContainer = 
    connect(mapStateToProps, { asyncSendMessage })(ChatForm);

export default ChatFormContainer;

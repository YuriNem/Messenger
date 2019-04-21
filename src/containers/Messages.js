import { connect } from 'react-redux';

import Messages from '../components/Messages/Messages.jsx';

const mapStateToProps = ({ messages }) => ({ messages });

const MessagesContainer = connect(mapStateToProps)(Messages);

export default MessagesContainer;

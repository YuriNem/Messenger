import { connect } from 'react-redux';

import Dialogues from '../components/Dialogues/Dialogues.jsx';

const mapStateToProps = ({ dialogues }) => ({ dialogues });

const DialoguesContainer = connect(mapStateToProps)(Dialogues);

export default DialoguesContainer;

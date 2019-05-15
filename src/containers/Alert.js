import { connect } from 'react-redux';
import {
    asyncRemoveAlert,
} from '../actions';

import Alert from '../components/Alert/Alert.jsx';

const mapStateToProps = ({ alert }) => ({ alert });

const AlertContainer = connect(mapStateToProps, {
    asyncRemoveAlert,
})(Alert);

export default AlertContainer;

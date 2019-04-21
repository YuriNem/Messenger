import { connect } from 'react-redux';
import {
    asyncSign,
    asyncIsAvailableUsername,
} from '../actions';

import Form from '../components/Form/Form.jsx';

const mapStateToProps = ({ error }) => ({ error });

const FormContainer = connect(mapStateToProps, {
    asyncSign,
    asyncIsAvailableUsername,
})(Form);

export default FormContainer;

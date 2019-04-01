import { connect } from 'react-redux';
import {
    asyncClickFormType,
    asyncChangeEmail,
    asyncChangePassword,
    asyncSubmitForm,
} from '../actions';

import Form from '../components/Form/Form.jsx';

const mapStateToProps = state => state;

const FormContainer = connect(mapStateToProps, {
    asyncClickFormType,
    asyncChangeEmail,
    asyncChangePassword,
    asyncSubmitForm,
})(Form);

export default FormContainer;

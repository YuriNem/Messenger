import { connect } from 'react-redux';
import { 
    asyncSubmitForm, 
    asyncClickFormType, 
    asyncChangeEmail, 
    asyncChangePassword,
} from '../actions';

import Form from '../components/Form/Form.jsx';

const mapStateToProps = state => state;

const FormContainer = connect(mapStateToProps, { 
    asyncSubmitForm, 
    asyncClickFormType, 
    asyncChangeEmail, 
    asyncChangePassword,
})(Form);

export default FormContainer;

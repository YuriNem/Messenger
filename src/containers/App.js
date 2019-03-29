import { connect } from 'react-redux';
import { 
    asyncSubmitForm, 
    asyncClickFormType, 
    asyncChangeEmail, 
    asyncChangePassword,
} from '../actions';

import App from '../components/App.jsx';

const mapStateToProps = state => state;

const AppContainer = connect(mapStateToProps, { 
    asyncSubmitForm, 
    asyncClickFormType, 
    asyncChangeEmail, 
    asyncChangePassword,
})(App);

export default AppContainer;

import { connect } from 'react-redux';

import App from '../components/App/App.jsx';

const mapStateToProps = ({ username, alert }) => ({ username, alert });

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;

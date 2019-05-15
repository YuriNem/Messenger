import React from 'react';

import Messenger from '../Messenger/Messenger.jsx';
import FormContainer from '../../containers/Form.js';
import AlertContainer from '../../containers/Alert.js';

const App = ({ username, alert }) => {
    return (
        <div className="app">
            {username ? <Messenger /> : <FormContainer />}
            {alert ? <AlertContainer /> : null}
        </div>
    );
}

export default App;

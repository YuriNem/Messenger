import React from 'react';

import Messenger from '../Messenger/Messenger.jsx';
import FormContainer from '../../containers/Form.js';

const App = ({ username }) => {
    return (
        <div className="app">
            {username ? <Messenger /> : <FormContainer />}
        </div>
    );
}

export default App;

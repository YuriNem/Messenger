import React from 'react';

import { Route } from 'react-router-dom';

import './Messenger.scss';

import DialoguesContainer from '../../containers/Dialogues.js';
import ChatContainer from '../../containers/Chat.js';

const Messenger = () => {
    return (
        <div className="messenger">
            <DialoguesContainer />
            <Route path="/dialogues/:username" component={ChatContainer} />
        </div>
    );
}

export default Messenger;

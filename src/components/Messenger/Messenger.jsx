import React from 'react';

import { Route } from 'react-router-dom';

import './Messenger.scss';

import HeaderContainer from '../../containers/Header.js';
import DialoguesContainer from '../../containers/Dialogues.js';
import ChatContainer from '../../containers/Chat.js';

const Messenger = () => {
    return (
        <div className="messenger">
            <HeaderContainer />
            <div className="messenger__main">
                <DialoguesContainer />
                <Route path="/dialogues/:username" component={ChatContainer} />
            </div>
        </div>
    );
}

export default Messenger;

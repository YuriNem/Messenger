import React from 'react';

import './Dialogue.scss';

const Dialogue = ({ username }) => {
    return (
        <div className="dialogue">{username}</div>
    );
}

export default Dialogue;

import React from 'react';
import classNames from 'classnames';

import './style.scss';

const classDialogue = active => {
    return classNames({
        'dialogue': true,
        'dialogue_active': active,
    });
}

const Dialogue = ({ name, active }) => {
    return (
        <div className={classDialogue(active)}>{name}</div>
    );
}

export default Dialogue;

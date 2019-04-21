import React from 'react';

import { NavLink } from 'react-router-dom';

import './Dialogues.scss';

import Dialogue from '../Dialogue/Dialogue.jsx';

const Dialogues = ({ dialogues }) => {
    return (
        <div className="dialogues">
            {
                dialogues.map(username =>
                    <NavLink
                        to={`/dialogues/${username}`}
                        className="dialogues__link"
                        activeClassName="dialogues__link_active"
                        key={Math.random()}
                    >
                        <Dialogue username={username} />
                    </NavLink>
                )
            }
        </div>
    );
}

export default Dialogues;

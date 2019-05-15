import React from 'react';

import { NavLink } from 'react-router-dom';

import './Dialogues.scss';

import Dialogue from '../Dialogue/Dialogue.jsx';

class Dialogues extends React.Component {
    state = {
        find: '',
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    filter = dialogue => {
        const { find } = this.state;

        return dialogue.toLowerCase().indexOf(find.toLowerCase()) !== -1;
    }

    render() {
        const { find } = this.state;
        const { dialogues } = this.props;

        return (
            <div className="dialogues">
                <div className="dialogues__input-block">
                    <input
                        className="dialogues__input"
                        type="search"
                        placeholder="Search"
                        name="find"
                        value={find}
                        onChange={this.onChange}
                    />
                </div>
                {
                    dialogues.filter(this.filter).map(username =>
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
}

export default Dialogues;

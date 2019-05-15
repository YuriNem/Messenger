import React from 'react';
import cn from 'classnames';

import './Header.scss';

import UsernamesListContainer from '../../containers/UsernamesList.js';

const classButton = isUsernamesListOpen => {
    return cn({
        'header__button': true,
        'header__button_active': isUsernamesListOpen,
    });
}

class Header extends React.Component {
    state = {
        isUsernamesListOpen: false,
    }

    onClickButton = () => {
        const { isUsernamesListOpen } = this.state;

        this.setState({ isUsernamesListOpen: !isUsernamesListOpen });
    }

    render() {
        const { isUsernamesListOpen } = this.state;
        const { asyncRemoveUsername } = this.props;

        return (
            <div className="header">
                <button
                    className={classButton(isUsernamesListOpen)}
                    onClick={this.onClickButton}
                >Start dialogue</button>
                {
                    isUsernamesListOpen ?
                        <UsernamesListContainer
                            onClickButton={this.onClickButton}
                        />
                    :
                        null
                }
                <div className="header__text">Messenger</div>
                <button
                    className="header__button"
                    onClick={asyncRemoveUsername}
                ><div className="header__close"></div></button>
            </div>
        );
    }
}

export default Header;

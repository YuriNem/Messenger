import React from 'react';

import './UsernamesList.scss';

class UsernamesList extends React.Component {
    componentDidMount() {
        const { asyncGetUsernames } = this.props;

        asyncGetUsernames();
    }

    onClickAddDialogue = username => () => {
        const { asyncAddDialogue, onClickButton } = this.props;

        asyncAddDialogue({ username });
        onClickButton();
    }

    filter = usernameItem => {
        const { username, dialogues } = this.props;

        return usernameItem !== username && !dialogues.includes(usernameItem);
    }

    render() {
        const { usernames } = this.props;

        return (
            <div className="usernames-list">
                {
                    usernames.filter(this.filter).map(username =>
                        <div
                            className="usernames-list__item"
                            onClick={this.onClickAddDialogue(username)}
                            key={Math.random()}
                        >{username}</div>
                    )
                }
            </div>
        );
    }
}

export default UsernamesList;

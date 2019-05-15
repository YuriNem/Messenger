import React from 'react';

import './Alert.scss';

class Alert extends React.Component {
    componentDidMount() {
        const { asyncRemoveAlert } = this.props;

        this.timerId = setTimeout(() => {
            asyncRemoveAlert();
        }, 1000);
    }

    componentDidUpdate() {
        const { asyncRemoveAlert } = this.props;
        
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            asyncRemoveAlert();
        }, 1000);
    }

    render() {
        const { alert } = this.props;
        const { username, text } = alert;

        return (
            <div className="alert">
                <div className="alert__username">{username}</div>
                <div className="alert__text">{text}</div>
            </div>
        );
    }
}

export default Alert;

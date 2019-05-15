import { connect } from 'react-redux';
import {
    asyncGetUsernames,
    asyncAddDialogue,
} from '../actions';

import UsernamesList 
    from '../components/UsernamesList/UsernamesList.jsx';

const mapStateToProps = ({
    usernames,
    username,
    dialogues,
}) => ({
    usernames,
    username,
    dialogues,
});

const UsernamesListContainer = connect(mapStateToProps, {
    asyncGetUsernames,
    asyncAddDialogue,
})(UsernamesList);

export default UsernamesListContainer;

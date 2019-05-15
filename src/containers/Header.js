import { connect } from 'react-redux';
import { asyncRemoveUsername } from '../actions';

import Header from '../components/Header/Header.jsx';

const mapStateToProps = () => ({});

const HeaderContainer =
    connect(mapStateToProps, { asyncRemoveUsername })(Header);

export default HeaderContainer;

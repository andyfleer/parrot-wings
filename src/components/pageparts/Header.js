import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import TopPanel from './TopPanel';

const Header = (props) => (
    <React.Fragment>
        <Menu 
            changePage={ props.changePage } 
            currentPage={ props.currentPage }
            currentUserName={ props.currentUserName }
            logout={ props.logout }
            />
        <TopPanel 
            currentUserBalance={ props.currentUserBalance }
            pageTitle={ props.pageTitle }
            loggedUserInfoErrorText={ props.loggedUserInfoErrorText }
        />
    </React.Fragment>
);

Header.propTypes = {
    changePage: PropTypes.func,
    currentPage: PropTypes.string,
    currentUserName: PropTypes.string,
    currentUserBalance: PropTypes.number,
    pageTitle: PropTypes.string,
    loggedUserInfoErrorText: PropTypes.string,
    logout: PropTypes.func
}

export default Header;
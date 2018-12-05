import React from 'react';
import PropTypes from 'prop-types';


const Menu = (props) => (
        <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse p-0 py-1">
            <div className="container nav__container_sm">
                <button className="navbar-toggler navbar-toggler-right"
                    data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <span className="navbar-brand mr-3 text-warning h2 mt-1">
                    Parrot Wings
                </span>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item px-2 text-center">
                        <button onClick={ () => props.changePage('transaction') } 
                        className={ `btn-link mx-auto nav-link ${ props.currentPage === 'transaction' && 'active' }` }
                        >Create Transaction</button>
                    </li>
                    <li className="nav-item px-2 text-center">
                        <button onClick={ () => props.changePage('history') } 
                        className={ `btn-link mx-auto nav-link ${ props.currentPage === 'history' && 'active' }` }
                        >History</button>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-3 text-center">
                    <span className="nav-link">
                    <i className="fa fa-user"></i> Welcome { props.currentUserName }</span>
                </li>
                <li className="nav-item text-center">
                    <span onClick={ props.logout } className="nav-link" style={{ cursor: 'pointer' }}>
                      <i className="fa fa-user-times"></i> Log Out
                    </span>
                </li>
                </ul>
            </div>
            </div>
        </nav>
);

Menu.propTypes = {
    changePage: PropTypes.func,
    currentPage: PropTypes.string,
    currentUserName: PropTypes.string,
    logout: PropTypes.func
}

export default Menu;
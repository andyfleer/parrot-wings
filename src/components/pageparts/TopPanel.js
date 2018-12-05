import React from 'react';
import PropTypes from 'prop-types';

const TopPanel = (props) => (
    <React.Fragment>
        <header id="main-header" className="py-2 bg-primary text-white">
            <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex">
                <h1>
                    <i className="fas fa-dove text-warning"></i> { props.pageTitle }            
                </h1>
                <span className="d-inline-block ml-auto mt-2 text-right header__balance">
                    Balance 
                    <span className="ml-1 badge badge-info">
                        { props.currentUserBalance }
                     $</span>
                </span>
                </div>
            </div>
            </div>
        </header>
        <section id="actions" className="py-4 mb-4 bg-faded">
            <div className="container">
                <div className="row">
                    <div className="col text-right">    
                        <span className="ml-auto mt-1 d-block text-danger">
                            { props.loggedUserInfoErrorText }
                        </span>          
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
);

TopPanel.propTypes = {
    currentUserBalance: PropTypes.number,
    pageTitle: PropTypes.string,
    loggedUserInfoErrorText: PropTypes.string
}


export default TopPanel;
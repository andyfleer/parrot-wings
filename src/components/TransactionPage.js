import React from 'react';
import PropTypes from 'prop-types';
import Header from './pageparts/Header';
import Footer from './pageparts/Footer';
import MoneyTransferModule from './modules/MoneyTranferModule';

class TransactionPage extends React.Component {
    render() {
        return (              
            <React.Fragment>
                <Header changePage={ this.props.changePage } 
                        currentPage={ this.props.currentPage }
                        currentUserName={ this.props.currentUserName }
                        currentUserBalance={ this.props.currentUserBalance }
                        pageTitle={ this.props.pageTitle }
                        loggedUserInfoErrorText={ this.props.loggedUserInfoErrorText }
                        logout={ this.props.logout }
                />

                <MoneyTransferModule 
                        currentUserBalance={ this.props.currentUserBalance }        
                        id_token={ this.props.id_token }
                        turnOnPreloader={ this.props.turnOnPreloader }
                        transactionSample={ this.props.transactionSample }
                        transactionsHistory={ this.props.transactionsHistory }
                        changePage={ this.props.changePage } 
                        setErrorMessageToState={ this.props.setErrorMessageToState }
                        usersListErrorText={ this.props.usersListErrorText }
                        updateUserInfo={ this.props.updateUserInfo }
                        transactionErrorText={ this.props.transactionErrorText }
                />
            
                <Footer />
        </React.Fragment>       
        );
    }
}

TransactionPage.propTypes = {
    changePage: PropTypes.func,
    currentPage: PropTypes.string,
    currentUserName: PropTypes.string,
    currentUserBalance: PropTypes.number,
    pageTitle: PropTypes.string,
    id_token: PropTypes.string,
    transactionSample: PropTypes.object,
    transactionsHistory: PropTypes.array,
    turnOnPreloader: PropTypes.func,
    loggedUserInfoErrorText: PropTypes.string,
    usersListErrorText: PropTypes.string,
    setErrorMessageToState: PropTypes.func,
    updateUserInfo: PropTypes.func,
    transactionErrorText: PropTypes.string,
    logout: PropTypes.func
}

export default TransactionPage;
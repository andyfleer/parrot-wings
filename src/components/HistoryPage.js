import React from 'react';
import Header from './pageparts/Header';
import Footer from './pageparts/Footer';
import PropTypes from 'prop-types';

class HistoryPage extends React.Component {

    state = {
        sortingFunc: this.sortingDate 
    }


    // we use these fucs later on the page for sorting data
    sortByNameASC = () => this.setState({ sortingFunc: (a, b) => ('' + a.username).localeCompare(b.username) });
    sortByNameDSC = () =>  this.setState({ sortingFunc: (a, b) => ('' + b.username).localeCompare(a.username) });
    sortByDateASC = () => this.setState({ sortingFunc: (a, b) => a.date < b.date });
    sortByDateDSC = () => this.setState({ sortingFunc: (a, b) => a.date > b.date });
    sortByAmoutASC = () => this.setState({ sortingFunc: (a, b) => a.amount < b.amount });
    sortByAmoutDSC = () => this.setState({ sortingFunc: (a, b) => a.amount > b.amount });
    

    render() {
        var dateTimeFormat = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return (              
            <React.Fragment>
                <Header changePage={ this.props.changePage } 
                        currentPage={ this.props.currentPage }
                        currentUserName={ this.props.currentUserName }
                        currentUserBalance={ this.props.currentUserBalance }
                        pageTitle={ this.props.pageTitle }
                />

            <section id="history" className="history-table">
                <div className="container">
                <div className="row">
                    <div className="col">
                    <div className="card">
                        <div className="card-header d-flex">
                        <h4>Latest Transactions</h4>
                        <span className="ml-auto mt-1 d-block text-danger">
                            { this.props.transactionsListErrorText }
                        </span>
                        </div>
                        <table className="table table-warning table-striped">
                        <thead className="bg-warning text-white">
                            <tr>
                            <th className="hidden-sm-down">#</th>
                            <th>
                                <span className="hidden-sm-down">Date/</span>Time
                                <i className="fas fa-sort-numeric-up hidden-sm-down history-page__sorting-icon"
                                onClick={ this.sortByDateASC } 
                                ></i>
                                <i className="fas fa-sort-numeric-down hidden-sm-down history-page__sorting-icon"
                                onClick={ this.sortByDateDSC } 
                                ></i>
                            </th>
                            <th><span className="hidden-sm-down">Correspondent</span> Name
                                <i className="fas fa-sort-alpha-up hidden-sm-down history-page__sorting-icon"
                                onClick={ this.sortByNameASC } 
                                ></i>
                                <i className="fas fa-sort-alpha-down hidden-sm-down history-page__sorting-icon"
                                onClick={ this.sortByNameDSC }                                 
                                ></i>
                            </th>
                            <th><span className="hidden-sm-down">Transaction</span> Amount
                                <i className="fas fa-sort-numeric-up hidden-sm-down history-page__sorting-icon"
                                onClick={ this.sortByAmoutASC } 
                                ></i>
                                <i className="fas fa-sort-numeric-down hidden-sm-down history-page__sorting-icon"
                                onClick={ this.sortByAmoutDSC }                                 
                                ></i>
                            </th>
                            <th className="hidden-sm-down"><span className="hidden-sm-down">Resulting</span> Balance</th>
                            <th><span className="hidden-sm-down">Make Copy</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.transactionsHistory.sort(this.state.sortingFunc)
                                .map((item, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td className="hidden-sm-down">{ i + 1 }</td>
                                            <td className="history__date-time">{ new Date(item.date).toLocaleDateString("en-US", dateTimeFormat) }</td>
                                            <td className="history__username">{ item.username }</td>
                                            <td>{ item.amount }</td>
                                            <td className="hidden-sm-down">{ item.balance }</td>
                                            <td>
                                                <i
                                                onClick={ () => this.props.setTransactionSample({ name: item.username,  amount: item.amount }) }
                                                className={ `far fa-clone ${ item.amount < this.props.currentUserBalance ? 
                                                    'history-page__makeTransactionFromSampleIcon' : 
                                                    'history-page__makeTransactionFromSampleIcon_disabled' }` }
                                                ></i>
                                            </td>
                                        </tr>            
                                    )
                                })

                            }
                        </tbody>
                        </table>


                    </div>
                    </div>
                </div>
                </div>
            </section>



            
            <Footer />
        </React.Fragment>       
        );
    }
}

HistoryPage.propTypes = {
    changePage: PropTypes.func,
    currentPage: PropTypes.string,
    currentUserName: PropTypes.string,
    currentUserBalance: PropTypes.number,
    transactionsHistory: PropTypes.array,
    setTransactionSample: PropTypes.func,
    pageTitle: PropTypes.string,
    transactionsListErrorText: PropTypes.string
}

export default HistoryPage;
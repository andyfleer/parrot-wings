import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../pageparts/Autocomplete';
import { createTransaction } from '../../libs/ServerInteractionLib';

class MoneyTransferModule extends React.Component {

    state = {
        id_token: this.props.id_token,
        user: null,
        currentUserBalance: this.props.currentUserBalance,
        amountToTransfer: 0,
        _transferBtnDisabled: true,
        successMsg: ''
    }

    enableBtnStransfer = () => {
        // enables / disables submit btn
        if(this.state.user === null || 
            this.state.amountToTransfer === 0) {
                this.setState({ _transferBtnDisabled: true });
        }
        else 
        {
            this.setState({ _transferBtnDisabled: false });
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.turnOnPreloader(true, "Making transaction")
            
        createTransaction(this.state.id_token, 
                    this.state.user.name, 
                    this.state.amountToTransfer, 
                    (result) => {
                        if( 'trans_token' in result) {
                            //all good! 
                            //need to update user info
                            //show message "all ok"
                            this.setState({ successMsg: 'Transaction completed successfuly' });

                            //clear fields
                            // this.setState({ user: null, amountToTransfer: 0 });

                            this.props.setErrorMessageToState('transactionError', '');
                            this.props.updateUserInfo(this.state.id_token);

                            
                        } else {
                            //error in transaction
                            //make error msg
                             this.props.setErrorMessageToState('transactionError', result.response.text);
                        }
                        this.enableBtnStransfer();
                    });
        

                    // {"trans_token":{"id":201,"date":"2018-12-4 23:36:47","username":"John Doo1","amount":-10,"balance":490}}


        this.props.turnOnPreloader(false);
    }

    nameChangeHandler = (user) => {
        this.setState({ user }, this.enableBtnStransfer);
    }

    amountToTransferChangeHandler = (event) => {
        let amountToTransfer = parseInt(event.target.value);
        if(isNaN(amountToTransfer)) {
            amountToTransfer = 0;   
        }

        if( amountToTransfer > this.state.currentUserBalance ) {
            //TODO
            // make msg
            //not enough money
        } else {
            this.setState({ amountToTransfer }, this.enableBtnStransfer);
        }

    }

    componentDidMount = () => {
        if(Object.keys(this.props.transactionSample).length > 0) {
            this.setTransactionFromSample(this.props.transactionSample.name, this.props.transactionSample.amount )
        }
    }

    setTransactionFromSample = (name, amount) => {
        const user = {
            id: 0,
            name,
        }            
        this.setState({ user, 
            amountToTransfer: Math.abs(amount),
            _transactionSamplesShow: false }, this.enableBtnStransfer);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ currentUserBalance: nextProps.currentUserBalance });
    }

   

    render() {
        return (
            <section id="transactions">
            <div className="container">
            <div className="row">
                <div className="col-md-9">
                
                
                    <div className="card mb-3">
                        <div className="card-header d-flex">
                            <h4 className="d-inline-block">Money Transfer</h4>
                            <span className="ml-auto mt-1 d-block text-success h5">
                                { this.state.successMsg }
                            </span>
                            <span className="ml-auto mt-1 d-block text-danger d-none">
                                { this.props.usersListErrorText }
                                { this.props.transactionErrorText }
                            </span>
                        </div>
                        <div className="card-block">
                        <div className="row mb-2">
                            <div className="col">
                            <p className="text-center">
                                You can create transaction on the basis of already made transaction. Do you want it?
                                <button 
                                    className="btn-sm btn-info ml-1 money-transfer-module__btn-transaction-sample"
                                    onClick={ () => this.props.changePage('history') }>
                                Yes! Let's make it
                                </button>
                            </p>
                            <hr/>
                            </div>
                        </div>
                        <form onSubmit={ this.formSubmitHandler }>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-control-label">
                                            Correspondent Name
                                        </label>
                                        <Autocomplete
                                            id_token={ this.props.id_token } 
                                            onChange={ this.nameChangeHandler }
                                            value={ this.state.user !== null ? this.state.user.name : '' }
                                            setErrorMessageToState={ this.props.setErrorMessageToState }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="amountToTransfer">Amount To Transfer</label>
                                    <input type="text" className="form-control" id="amountToTransfer" placeholder="Amount To Transfer"
                                        onChange={ this.amountToTransferChangeHandler }
                                        value={ this.state.amountToTransfer } />
                                </div>
                                <div className="col">
                                    <label htmlFor="currentBalance">Amount Available</label>
                                    <input type="text" className="form-control" readOnly id="currentBalance" 
                                        value={ `${this.state.currentUserBalance} $` } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button 
                                    disabled={ this.state._transferBtnDisabled }
                                    className="btn btn-lg btn-primary btn-block mt-5 mb-2">
                                        <i className="fas fa-dove text-white"></i>
                                    Transfer</button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>          
                    </div>
                






                <div className="col-md-3">
                <div className="card text-center card-primary text-white mb-3">
                    <div className="card-block">
                    <h3>Transactions</h3>
                    <h1 className="display-4"><i className="fas fa-exchange-alt mr-1"></i>0</h1>
                    </div>
                </div>
                <div className="card text-center card-success text-white mb-3">
                    <div className="card-block">
                    <h3>Friends</h3>
                    <h1 className="display-4"><i className="fa fa-users mr-1"></i>0</h1>
                    </div>
                </div>
                <div className="card text-center card-warning text-white mb-3">
                    <div className="card-block">
                    <h3>Days from Registration</h3>
                    <h1 className="display-4"><i className="far fa-clock mr-1"></i>0</h1>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </section>
        );
    }
}

MoneyTransferModule.propTypes = {
    currentUserBalance: PropTypes.number,
    id_token: PropTypes.string,
    turnOnPreloader: PropTypes.func,
    transactionSample: PropTypes.object,
    transactionsHistory: PropTypes.array,
    changePage: PropTypes.func,
    setErrorMessageToState: PropTypes.func,
    usersListErrorText: PropTypes.string,
    updateUserInfo: PropTypes.func,
    transactionErrorText: PropTypes.string
}

export default MoneyTransferModule;
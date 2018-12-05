import React, { Component } from 'react';
import { loginToServer, getLoggedUserInfo, getTransactionList, createUser } from './libs/ServerInteractionLib';
import Preloader from './components/pageparts/Preloader';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import TransactionPage from './components/TransactionPage';
import HistoryPage from './components/HistoryPage';

//TODO 
// enum pages
// set focus on fields login and so on +
// tooltip on copy transaction
// add error comment on input sum exceeding balance !
// correct menu on small screen !
// popup on successful transaction !
// using arrow up/down on autocomplete dropdown
// log out +
// format date-time +
// make floating points in money amounts 
// sorting data in history table +
// reset data in MoneyTransfer module after transaction


class App extends Component {
  state = {
    id_token: '',
    currentUserInfo: {
      id: '', 
      name: 'Unknown', 
      email: '', 
      balance: 0
    },
    errors: {
      signupError: '',
      transactionsListError: '',
      loggedUserInfoError: '',
      loginError: '',
      usersListError: '',
      transactionError: ''
    }, 
    transactionsHistory: [],
    transactionSample: {},
    currentPage: 'login',
    showPreloader: false,
    preloaderMessage: ''
  }


  logout = () => {
    const errors = {
      signupError: '',
      transactionsListError: '',
      loggedUserInfoError: '',
      loginError: '',
      usersListError: '',
      transactionError: ''
    };

    this.setState({ id_token: '', currentUserInfo: '', transactionsHistory: [], transactionSample: {}, errors, currentPage: 'login' });
  }


  changePage = (currentPage) => this.setState({ currentPage });
  
  // .send({"password":"johnpwd1","email":"john@doo.foo2"})

  turnOnPreloader = (showPreloader, message) => {
    // if message undefined (was not sent) set it in state to empty str 
    const preloaderMessage = (message === undefined) ? '' : message;
    this.setState({ showPreloader, preloaderMessage })
  }

  setTransactionSample = (transactionSample) => {
    this.setState({ transactionSample });
    this.changePage('transaction');
  }

  setErrorMessageToState = (errMsgType, errorMsgText) => {
    this.setState(prevState => ({
      errors: {
           ...prevState.errors,
           [errMsgType]: errorMsgText
       }
     }))
  } 

  signup = (username, password, email) => {

    createUser(username, password, email, (result) => {
      //means user created
      if('id_token' in result) {
        const {id_token} = result;

        //all is ok - removing error record from state
        this.setErrorMessageToState('signupError', '');

        this.getUserInfoFromServer(id_token);
        this.setState({ id_token });

        this.changePage('transaction');

      } else {
        //here do smth with error
        this.setErrorMessageToState('signupError', result.response.text);
      }

    })
  }

  getUserInfoFromServer = (id_token) => {
        this.turnOnPreloader(true, "Getting your personal information from server")
        // getting user info and putting in into state
        getLoggedUserInfo(id_token, (userInfo) => {
            if('user_info_token' in userInfo) {
              // we got info! no error!
              this.setState({ currentUserInfo: userInfo.user_info_token });
              //load transaction history to state
              getTransactionList(id_token, (transactionsList) =>{ 
                if('trans_token' in transactionsList) {
                  //no error
                  this.setState({ transactionsHistory: transactionsList.trans_token });
                  //TODO remove error msg from state
                  this.setErrorMessageToState('transactionsListError', '');
                } else {
                  //error
                  let errMsg = transactionsList.response.text;
                  if (transactionsList.status === 401) 
                  {
                    errMsg = 'Error loading transactions history. You can not use service now.';
                  }
                  this.setErrorMessageToState('transactionsListError', errMsg );
                }

              })
              this.setErrorMessageToState('loggedUserInfoError', '');
            } else {
              // TODO smth with error
              let errMsg = userInfo.response.text;
              if (userInfo.status === 401) 
              {
                errMsg = 'Error loading user info.  Unauthorized or invalid user. You can not use service now.';
              }
              this.setErrorMessageToState('loggedUserInfoError', errMsg );
            }
        })
        this.turnOnPreloader(false);
  }

  login = (email, password) => {
    // we send this func to <LoginPage />
    // for getting back object with id_token or error code
    this.turnOnPreloader(true, "Connecting to server with your loging and password");
    loginToServer(email, password, 
      (result) => {
        if('id_token' in result) {
          // Athorization ok (we know because of 'id_token' is to be in response )
          const {id_token} = result;

          this.getUserInfoFromServer(id_token);

          //save id_token to state and go to transactionPage (initial)
          this.setState({ id_token });
          this.changePage('transaction');

          //all ok - clear error record
          this.setErrorMessageToState('loginError', '');
          
        } else {
          this.setErrorMessageToState('loginError', result.response.text);
          // TODO smth with error
        }
      });

      this.turnOnPreloader(false);
  }

  pagesController = () => {
    switch(this.state.currentPage) {
      case 'signup':
            return <SignupPage 
              signup={ this.signup }
              changePage={ this.changePage }
              errorText={ this.state.errors.signupError }
              />
      case 'transaction':
            return <TransactionPage 
              changePage={ this.changePage }
              currentPage={ this.state.currentPage }
              currentUserName={ this.state.currentUserInfo.name }
              currentUserBalance={ this.state.currentUserInfo.balance }
              pageTitle="Create Transaction"
              id_token={ this.state.id_token }
              turnOnPreloader={ this.turnOnPreloader }
              transactionSample={ this.state.transactionSample }
              transactionsHistory={ this.state.transactionsHistory }
              loggedUserInfoErrorText={ this.state.errors.loggedUserInfoError }
              usersListErrorText={ this.state.errors.usersListError }
              setErrorMessageToState={ this.setErrorMessageToState }
              updateUserInfo={ this.getUserInfoFromServer }
              transactionErrorText={ this.state.errors.transactionError }
              logout={ this.logout }
              />
      case 'history':
            return <HistoryPage
              changePage={ this.changePage }
              currentPage={ this.state.currentPage }
              currentUserName={ this.state.currentUserInfo.name }
              currentUserBalance={ this.state.currentUserInfo.balance }
              transactionsHistory={ this.state.transactionsHistory }
              setTransactionSample ={ this.setTransactionSample }
              transactionsListErrorText={ this.state.errors.transactionsListError }
              pageTitle="History"
              />
      
      default: 
            return <LoginPage 
                changePage={ this.changePage }
                login={ this.login }
                errorText={ this.state.errors.loginError }
                />
    }
  }

  render() {
    return (
      <div>
      <Preloader show={ this.state.showPreloader } message={ this.state.preloaderMessage } />
      {
          this.pagesController()
      }
      </div>
    );
  }
}

export default App;

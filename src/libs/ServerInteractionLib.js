import superagent from 'superagent';
import PropTypes from 'prop-types';

export const loginToServer = (email, password, sendResult) => {

    const loginParams = {"password": password,"email": email}

    superagent
        .post('http://193.124.114.46:3001/sessions/create')
        .send(loginParams)
        // .send({"password": "johnpwd1","email": "john@doo.foo2"})
        .accept('application/json')
        .then(res => {
            sendResult(res.body)
        })
        .catch((err) => {
            sendResult(err);
        // 400: You must send email and password.
        // 401: Invalid email or password.

        });

// ===========================
        // API

        //Login

// POST /sessions/create
// body:
// {email, password}
// returns:
// {id_token}
// errors:
// 400: You must send email and password.
// 401: Invalid email or password.
}

loginToServer.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    sendResult: PropTypes.func
}


export const getLoggedUserInfo = (id_token, callback) => {
    superagent
        .get('http://193.124.114.46:3001/api/protected/user-info')
        .set('Authorization', 'Bearer ' + id_token)
        .accept('application/json')
        .then(res => {
            callback(res.body);
            // this.setState({ posts });
        })
        .catch((err) => {
            callback(err);
            throw err;                    
        });

// ===========================
        // API

    // Logged user info

// GET /api/protected/user-info        
// authentication: bearer        
// body:      
// returns: {id, name, email, balance}
// errors:        
// 400: user not found
// 401: UnauthorizedError
// 401: Invalid user
}

getLoggedUserInfo.propTypes = {
    id_token: PropTypes.string,
    sendResult: PropTypes.func
}



export const getFilteredUserList = (id_token, filter, sendListCallBack) => {
    superagent
        .post('http://193.124.114.46:3001/api/protected/users/list')
        .set('Authorization', 'Bearer ' + id_token)
        .send({"filter": filter})
        .accept('application/json')
        .then(res => {
            // const posts = JSON.stringify(res.body);
            sendListCallBack(res.body);
            // this.setState({ posts });
        })
        .catch((err) => {
            sendListCallBack(err);
            throw err;                    
        });

// ===========================
        // API

    // Filtered User list

// POST /api/protected/users/list
// authentication: bearer
// body:
// {filter}
// returns:
// [{id, name}]
// errors:
// 401: UnauthorizedError
// 401: Invalid user
// 401: No search string
}


getFilteredUserList.propTypes = {
    id_token: PropTypes.string,
    filter: PropTypes.string,
    sendListCallBack: PropTypes.func
}


export const getTransactionList = (id_token, getTransactionsHistoryCallBack) => {
    superagent
        .get('http://193.124.114.46:3001/api/protected/transactions')
        .set('Authorization', 'Bearer ' + id_token)
        .accept('application/json')
        .then(res => {
            getTransactionsHistoryCallBack(res.body);
        })
        .catch((err) => {
            getTransactionsHistoryCallBack(err);
            throw err;                    
        });

// ===========================
             // API
        
    // List of logged user transactions

// GET /api/protected/transaction
// authentication: bearer
// body:
// returns:
// {trans_token:[{id, date, username, amount, balance}]}
// errors:
// 401: UnauthorizedError
// 401: Invalid user

}

getTransactionList.propTypes = {
    id_token: PropTypes.string,
    getTransactionsHistoryCallBack: PropTypes.func
}



export const createUser = (username, password, email, resultCallback) => {
    superagent
        .post('http://193.124.114.46:3001/users')
        .send({"username": username,"password": password,"email": email})
        .accept('application/json')
        .then(res => {
            // const posts = JSON.stringify(res.body);
            resultCallback(res.body);
            // this.setState({ posts });
        })
        .catch((err) => {
            resultCallback(err);
            throw err;                    
        });


        // ===========================
             // API

//     Create/Register a user


// POST /users
// body:
// {username, password, email}
// returns:
// {id_token}
// errors:
// 400: A user with that email already exist
// 400: You must send username and password
// example:
// {"username":"John Doo","password":"johnpwd","email":"john@doo.foo"}
// {"id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFuaW1hbCBQbGFuZXQgVXNlciIsImVtYWlsIjoiMUAxLjEiLCJpZCI6MywiYmFsYW5jZSI6NTAwLCJpYXQiOjE0ODE1ODQ4ODksImV4cCI6MTQ4MTYwMjg4OX0.h4CzCxTOMRk6S8juxM0tRc5pql99XkXlR09pUzVMH9I"}


}

createUser.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    resultCallback: PropTypes.func
}




export const createTransaction = (id_token, name, amount, callback) => {
    superagent
        .post('http://193.124.114.46:3001/api/protected/transactions')
        .set('Authorization', 'Bearer ' + id_token)
        .send({"name": name,"amount": amount})
        .accept('application/json')
        .then(res => {
            callback(res.body);
        })
        .catch((err) => {
            callback(err);
            throw err;                    
        });

// ===========================
             // API

//    Create a transaction

// Sender: logged user
//         Recipient: name in a body
//         POST /api/protected/transactions
//         authentication: bearer
//         body:
//         {name, amount}
//         returns:
//         {trans_token:{id, date, username, amount, balance}}
//         errors:            
// 400: user not found
// 400: balance exceeded            
// 401: UnauthorizedError
// 401: Invalid user

}

createTransaction.propTypes = {
    id_token: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    callback: PropTypes.func
}


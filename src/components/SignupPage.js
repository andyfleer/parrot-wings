import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

class SignupPage extends React.Component {
    state = {
        email: '',
        password: '',
        username: '',
        passwordConfirm: '',
        errorEmailReport: '',
        errorPwdReport: '',
        errorUserReport: ''
    }

    submitHandler = (event) => {
        event.preventDefault();

        let noErrors = true;


        if(!validator.isEmail(this.state.email)) {
            this.setState({ errorEmailReport: 'Wrong email format. Check errors. ' });
            noErrors = false;
        } else {
            this.setState({ errorEmailReport: '' })
        }

        if(this.state.username === '') {
            this.setState({ errorUserReport: 'User name can not be empty. Fill it in.' });
            noErrors = false;
        } else {
            this.setState({ errorUserReport: '' })
        }

        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({ errorPwdReport: 'Password and its confirmation are not equal. Retype it.' })
            noErrors = false;
        } else {
            this.setState({ errorPwdReport: '' })            
        }


        if(noErrors) {

            this.props.signup(this.state.username, this.state.password, this.state.email);

        }
    }

    componentDidMount = () => {
        this.nameInput.focus();
    }

    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <React.Fragment>
                <section className="signup-page__login-section">
                    <div className="container signup-page__login-container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <div className="card">
                                <div className="card-header d-flex">
                                    <h4 className="d-inline-block mt-1">SignUp</h4>
                                    <span className="ml-auto mt-1 d-block text-danger">
                                    { this.props.errorText }
                                    </span>
                                </div>
                            <div className="card-block pb-0">
                            <form onSubmit={ this.submitHandler }>
                            <div className="form-group">
                                <label htmlFor="username" className="form-control-label">User name</label>
                                <input
                                    ref={(input) => { this.nameInput = input; }}  
                                    type="text"  
                                    onChange={ this.inputHandler }  
                                    className="form-control" 
                                    name="username" />
                                <small className={`text-left errorNotifier 
                                    ${ this.state.errorUserReport !== '' && 'errorNotifier__show' }`}>
                                     { this.state.errorUserReport }    
                                </small>
                                </div>
                                <div className="form-group">
                                <label htmlFor="email" className="form-control-label">Email</label>
                                <input type="email"  onChange={ this.inputHandler }  className="form-control" name="email" />
                                <small className={`text-left errorNotifier 
                                    ${ this.state.errorEmailReport !== '' && 'errorNotifier__show' }`}>
                                     { this.state.errorEmailReport }    
                                </small>
                                </div>
                                <div className="form-group">
                                <label htmlFor="password" className="form-control-label">Password</label>
                                <input type="password"  onChange={ this.inputHandler }  className="form-control" name="password" />
                                <small className={`text-left errorNotifier 
                                    ${ this.state.errorPwdReport !== '' && 'errorNotifier__show' }`}>
                                     { this.state.errorPwdReport }    
                                </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordConfirm" className="form-control-label">Confirm Password</label>
                                    <input type="password"  onChange={ this.inputHandler }  className="form-control" name="passwordConfirm" />
                                    <small className={`text-left errorNotifier 
                                    ${ this.state.errorPwdReport !== '' && 'errorNotifier__show' }`}>
                                     { this.state.errorPwdReport }    
                                </small>
                                </div>      

                                <button 
                                    disabled={ this.state.email === '' || 
                                                this.state.username === '' ||
                                                this.state.passwordConfirm === '' ||
                                                this.state.password === '' }        
                                    className="btn btn-primary btn-block mb-3">SignUp</button>
                            </form>
                            <p className="d-block py-0 text-center">
                                If you are already signed <br/>
                                    <button
                                        href="#" 
                                        onClick={ () => this.props.changePage('login') } 
                                        className="btn btn-link text-primary">
                                        Login
                                    </button>
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

SignupPage.propTypes = {
    changePage: PropTypes.func,
    signup: PropTypes.func,
    errorText: PropTypes.string
}


export default SignupPage;
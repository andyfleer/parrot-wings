import React from 'react';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {
    state = {
        email: '',
        password: ''
    }


    submitHandler = (event) => {
        event.preventDefault();
        this.props.login(event.target.email.value, event.target.password.value);
    }

    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount = () => {
        this.emailInput.focus();
    }


    render() {
        return (
            <React.Fragment>
                <section className="login-page__login-section">
                    <div className="container login-page__login-container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header d-flex">
                                <h4 className="d-inline-block mt-1">Login</h4>
                                <span className="ml-auto mt-1 d-block text-danger">
                                    { this.props.errorText }
                                </span>
                            </div>
                            <div className="card-block pb-0">
                            <form onSubmit={ this.submitHandler } >
                                <div className="form-group">
                                <label htmlFor="email" className="form-control-label">Email</label>
                                <input 
                                    ref={(input) => { this.emailInput = input; }} 
                                    type="email" 
                                    onChange={ this.inputHandler } 
                                    className="form-control"
                                    name="email" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="password" className="form-control-label">Password</label>
                                <input type="password" onChange={ this.inputHandler } className="form-control" name="password" />
                                </div>
                                <button className="btn btn-primary btn-block mb-3"
                                    disabled={ !(this.state.email !== '' && this.state.password !== '') }      
                                    >
                                    Login
                                </button>
                            </form>
                            <p className="d-block py-1  text-center">
                                If you don't have login <br/>
                                <button
                                        href="#" 
                                        onClick={ () => this.props.changePage('signup') } 
                                        className="btn btn-link  text-primary"   
                                        >
                                        Signup
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

LoginPage.propTypes = {
    changePage: PropTypes.func,
    login: PropTypes.func,
    errorText: PropTypes.string
}

export default LoginPage;
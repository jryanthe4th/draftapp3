import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';

import RegisterPage from './RegisterPage';

export class RegisterPageContainer extends React.Component {
    constructor(props) {
        super(props);

        // bound functions
        this.registerFunction = this.registerFunction.bind(this);
    }

    registerFunction(userData) {
        const { dispatch } = this.props;
        dispatch(registerUser(userData));
    }

    render() {
        const { isLoggedIn, registrationSucceeded } = this.props.authentication;

        // forward to a success RegisterPage
        if (registrationSucceeded) {
            return (
                <Redirect to="/account/registration-success" />
            );
        }

        // User needs to be logged out to register
        if (isLoggedIn) {
            return (<p>Log out before creating a new account</p>);
        }

        // otherwise, display the form
        return <RegisterPage registerFunction={this.registerFunction} />;
    }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(RegisterPageContainer);

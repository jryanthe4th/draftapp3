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
        const { isSignedIn, registrationSucceeded } = this.props.authentication;

        // forward to a success RegisterPage
        if (registrationSucceeded) {
            return (
                <Redirect to="/account/registration-success" />
            );
        }

        // User needs to be logged out to register
        if (isSignedIn) {
            // return (<p className="paragraph-text">Sign out before creating a new account</p>);
            return (
                <Redirect to="/dashboard" />
            );
        }

        // otherwise, display the form
        return <RegisterPage registerFunction={this.registerFunction} />;
    }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(RegisterPageContainer);

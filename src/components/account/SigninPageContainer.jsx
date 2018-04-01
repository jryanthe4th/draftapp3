import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUserIn } from '../../actions/authentication';

import SigninPage from './SigninPage';

export class SigninPageContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bound functions
        this.signUserInFunction = this.signUserInFunction.bind(this);
    }

    signUserInFunction(userData) {
        const { dispatch } = this.props;
        dispatch(signUserIn(userData));
    }

    render() {
        const { authentication, isSignedIn } = this.props;

        if (authentication.isSignedIn) {
            return (
                <Redirect to="/" />
            );
        }

        if (isSignedIn) {
            return (<p className="paragraph-text">Sign out before attempting to sign into another account</p>);
        }

        return (
            <div>
                <SigninPage signinFunction={this.signUserInFunction} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
    };
}

export default connect(mapStateToProps)(SigninPageContainer);

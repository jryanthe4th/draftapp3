import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SigninPage extends React.Component {
    constructor(props) {
        super(props);

        // Bound functions
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);

        // Component state
        this.state = {
            email: '',
            password: '',
        };
    }

    // Update state as email value changes
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    // Catch enter clicks
    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.compileFormData();
        }
    }

    // Update state as password value changes
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    // Handle submission once all form data is valid
    handleValidSubmit() {
        const { signinFunction } = this.props;
        const formData = this.state;
        signinFunction(formData);
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-10 col-sm-7 col-md-5 col-lg-4" id="form-wrapper">
                    <AvForm onValidSubmit={this.handleValidSubmit}>
                        <AvGroup>
                            <AvInput
                                className="input"
                                id="userEmail"
                                name="email"
                                onChange={this.handleEmailChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="Email"
                                required
                                type="email"
                                value={this.state.email}
                            />
                            <AvFeedback>Valid email required to sign in</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                            <AvInput
                                className="input"
                                id="userPassword"
                                name="password"
                                onChange={this.handlePasswordChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="Password"
                                required
                                type="password"
                                value={this.state.password}
                            />
                            <AvFeedback>Password required to sign in</AvFeedback>
                        </AvGroup>
                        <Button className="primary-button" onClick={this.compileFormData}>SIGN IN</Button>
                        <div id="link">
                            <span><Link to="/account/reset-password">Forgot password?</Link></span>
                        </div>
                    </AvForm>
                </div>
            </div>
        );
    }
}

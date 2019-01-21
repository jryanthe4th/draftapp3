import React from 'react';
import { Link } from 'react-router-dom';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

export default class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    // component state
    this.state = {
      password: '',
      passwordCheck: '',
    };
  }

  // Handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // Catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      target.preventDefault();
      this.handleValidSubmit();
    }
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const formData = this.state;
    const { sendPasswordFunction } = this.props;
    sendPasswordFunction(formData.password);
  }

  render() {
    const { isPasswordChanged, isSignedIn } = this.props.authentication;

    // If they just changed a password and AREN'T logged in
    if (isPasswordChanged && !isSignedIn) {
      return (
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-7 col-md-5 col-lg-4' id='form-wrapper'>
            <p className='paragraph-text' id='link'>
              Your changes have been saved, and you can
              now <Link to='/account/signin'>SIGN IN</Link> with
              the new password.
            </p>
          </div>
        </div>
      );
    }

    // If they just changed a password and ARE logged in
    if (isPasswordChanged && isSignedIn) {
      return (
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-7 col-md-5 col-lg-4'>
            <p className='paragraph-text'>
              Your new password has been saved.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className='row justify-content-center'>
        <div className='col-10 col-sm-7 col-md-5 col-lg-4' id='form-wrapper'>
          <p className='paragraph-text'>
            Please enter and confirm a new password below to change the
            password associated with this email address.
          </p>

          <AvForm onValidSubmit={this.handleValidSubmit}>

            <AvGroup>
              <AvInput
                className='input'
                id='password'
                minLength='8'
                name='password'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder='Password'
                required
                type='password'
                value={this.state.password}
              />
              <AvFeedback>Passwords must be at least eight characters in length</AvFeedback>
            </AvGroup>

            <AvGroup>
              <AvInput
                className='input'
                id='passwordCheck'
                minLength='8'
                name='passwordCheck'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder='Confirm password'
                required
                type='password'
                validate={{ match: { value: 'password' } }}
                value={this.state.passwordCheck}
              />
              <AvFeedback>Passwords must match</AvFeedback>
            </AvGroup>

            <Button className='primary-button'>Change Password</Button>

          </AvForm>
        </div>
      </div>
    );
  }
}

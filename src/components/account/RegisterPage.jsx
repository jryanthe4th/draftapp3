import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    // component state
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: '',
    };
  }

  // // Put everything together and send it up to the register function
  // compileFormData() {
  //     const { registerFunction } = this.props;
  //     const formData = this.state;
  //     registerFunction(formData);
  // }

  // handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      target.preventDefault();
      this.compileFormData();
    }
  }

  // handle submission once all form data is valid
  handleValidSubmit() {
    const { registerFunction } = this.props;
    const formData = this.state;
    registerFunction(formData);
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-10 col-sm-7 col-md-5 col-lg-4' id='form-wrapper'>
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
              <AvInput
                className='input'
                id='email'
                name='email'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder='Email'
                required
                type='email'
                value={this.state.email}
              />
              <AvFeedback>Valid email required to register</AvFeedback>
            </AvGroup>

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
                id='username'
                name='username'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder='Username'
                required
                type='text'
                value={this.state.username}
              />
              <AvFeedback>Username required to register</AvFeedback>
            </AvGroup>

            <AvGroup>
              <AvInput
                className='input'
                id='firstName'
                name='firstName'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder='First Name'
                required
                type='text'
                value={this.state.firstName}
              />
              <AvFeedback>First name required to register</AvFeedback>
            </AvGroup>

            <AvGroup>
              <AvInput
                className='input'
                id='lastName'
                name='lastName'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder='Last Name'
                required
                type='text'
                value={this.state.lastName}
              />
              <AvFeedback>Last name required to register</AvFeedback>
            </AvGroup>
            <Button className='primary-button' onClick={this.compileFormData}>CREATE ACCOUNT</Button>
          </AvForm>
        </div>
      </div>
    );
  }
}

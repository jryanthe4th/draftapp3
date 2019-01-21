const initialState = {
  firstName: '',
  id: '',
  isSignedIn: false,
  isSigningIn: false,
  isPasswordChanged: false,
  isPasswordReset: false,
  lastName: '',
  registrationSucceeded: false,
  username: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case 'AUTHENTICATION_SIGNIN_ATTEMPT': {
    const newState = Object.assign({}, state);
    newState.isSigningIn = true;
    return newState;
  }
  case 'AUTHENTICATION_SIGNIN_FAILURE':
  case 'AUTHENTICATION_SESSION_CHECK_FAILURE':
  case 'AUTHENTICATION_SIGNOUT_SUCCESS': {
    const newState = Object.assign({}, initialState);
    return newState;
  }
  case 'AUTHENTICATION_SIGNIN_SUCCESS':
  case 'AUTHENTICATION_SESSION_CHECK_SUCCESS': {
    const newState = Object.assign({}, state);
    newState.firstName = action.json.firstName;
    newState.id = action.json._id;
    newState.isSignedIn = true;
    newState.isSigningIn = false;
    newState.lastName = action.json.lastName;
    newState.username = action.json.username;
    return newState;
  }
  case 'AUTHENTICATION_SIGNOUT_FAILURE':
  case 'AUTHENTICATION_REGISTRATION_FAILURE': {
    return state;
  }
  case 'AUTHENTICATION_PASSWORD_RESET_CLEAR':
  case 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE': {
    const newState = Object.assign({}, state);
    newState.isPasswordReset = false;
    return newState;
  }
  case 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED': {
    const newState = Object.assign({}, state);
    newState.isPasswordReset = true;
    return newState;
  }
  case 'AUTHENTICATION_PASSWORD_SAVE_CLEAR': {
    const newState = Object.assign({}, state);
    newState.isPasswordChanged = false;
    return newState;
  }
  case 'AUTHENTICATION_PASSWORD_SAVE_SUCCESS': {
    const newState = Object.assign({}, state);
    newState.isPasswordChanged = true;
    return newState;
  }
  case 'AUTHENTICATION_REGISTRATION_SUCCESS': {
    const newState = Object.assign({}, state);
    newState.registrationSucceeded = true;
    return newState;
  }
  case 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED': {
    const newState = Object.assign({}, state);
    newState.registrationSucceeded = false;
    return newState;
  }
  default: {
    return state;
  }
  }
}

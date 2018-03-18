import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
export const signinAttempt = () => ({ type: 'AUTHENTICATION_SIGNIN_ATTEMPT' });
export const signinFailure = error => ({ type: 'AUTHENTICATION_SIGNIN_FAILURE', error });
export const signinSuccess = json => ({ type: 'AUTHENTICATION_SIGNIN_SUCCESS', json });
export const signoutFailure = error => ({ type: 'AUTHENTICATION_SIGNOUT_FAILURE', error });
export const signoutSuccess = () => ({ type: 'AUTHENTICATION_SIGNOUT_SUCCESS' });
export const registrationFailure = error => ({ type: 'AUTHENTICATION_REGISTRATION_FAILURE', error });
export const registrationSuccess = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS' });
export const registrationSuccessViewed = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED' });
export const passwordResetClear = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_CLEAR' });
export const passwordResetHashCreated = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' });
export const passwordResetHashFailure = error => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE', error });
export const passwordSaveClear = () => ({ type: 'AUTHENTICATION_PASSWORD_SAVE_CLEAR' });
export const passwordSaveFailure = error => ({ type: 'AUTHENTICATION_PASSWORD_SAVE_FAILURE', error });
export const passwordSaveSuccess = () => ({ type: 'AUTHENTICATION_PASSWORD_SAVE_SUCCESS' });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

// Check User Session
export function checkSession() {
    return async (dispatch) => {
        // contact the API
        await fetch(
            // where to contact
            '/api/authentication/checksession',
            // what to send
            {
                method: 'GET',
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then((json) => {
                if (json.username) {
                    return dispatch(sessionCheckSuccess(json));
                }
                return dispatch(sessionCheckFailure());
            })
            .catch(error => dispatch(sessionCheckFailure(error)));
    };
}

// Send email to API for hashing
export function createHash(email) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementProgress());

        // contact the API
        await fetch(
            // where to contact
            '/api/authentication/saveresethash',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then((json) => {
                if (json.success) {
                    return dispatch(passwordResetHashCreated(json));
                }
                return dispatch(passwordResetHashFailure(new Error('Something went wrong. Please try again.')));
            })
            .catch(error => dispatch(passwordResetHashFailure(error)));

        // turn off the spinner
        return dispatch(decrementProgress());
    };
}

// Sign User In
export function signUserIn(userData) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementProgress());

        // register that a signin attempt is being made
        dispatch(signinAttempt());

        // contact signin API
        await fetch(
            // where to contact
            '/api/authentication/signin',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then((json) => {
                if (json) {
                    dispatch(signinSuccess(json));
                } else {
                    dispatch(signinFailure(new Error('Email or Password Incorrect. Please Try Again.')));
                }
            })
            .catch((error) => {
                dispatch(signinFailure(new Error(error)));
            });

        // turn off spinner
        return dispatch(decrementProgress());
    };
}

// Sign User Out
export function signUserOut() {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementProgress());

        // contact the API
        await fetch(
            // where to contact
            '/api/authentication/signout',
            // what to send
            {
                method: 'GET',
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    dispatch(signoutSuccess());
                } else {
                    dispatch(signoutFailure(new Error(response.status)));
                }
            })
            .catch((error) => {
                dispatch(signoutFailure(new Error(error)));
            });

        // turn off spinner
        return dispatch(decrementProgress());
    };
}

// Register a User
export function registerUser(userData) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementProgress());

        // contact the API
        await fetch(
            // where to contact
            '/api/authentication/register',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then(async (json) => {
                if (json && json.username) {
                    await dispatch(signinSuccess(json));
                    await dispatch(registrationSuccess());
                } else {
                    dispatch(registrationFailure(new Error(json.error.message ? 'Email or username already exists' : json.error)));
                }
            })
            .catch((error) => {
                dispatch(registrationFailure(new Error(error.message || 'Registration Failed. Please Try Again.')));
            });

        // turn off spinner
        return dispatch(decrementProgress());
    };
}

// Save a user's password
export function savePassword(data) {
    return async (dispatch) => {
    // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementProgress());

        // contact the API
        await fetch(
            // where to contact
            '/api/authentication/savepassword',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then(async (json) => {
                if (json && json.success) {
                    dispatch(passwordSaveSuccess());
                } else {
                    dispatch(passwordSaveFailure(new Error(json.error.message ? 'There was an error saving the password. Please try again' : json.error)));
                }
            })
            .catch((error) => {
                dispatch(passwordSaveFailure(new Error(error.message || 'There was an error saving the password. Please try again.')));
            });

        // turn off spinner
        return dispatch(decrementProgress());
    };
}

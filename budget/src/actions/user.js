const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNOUT = 'SIGNOUT';

export const signupSuccess = data => {
  sessionStorage.setItem('jwt', data.token);
  return {type: SIGNUP_SUCCESS, username: data.username, token: data.token}
}

export const signupFailure = error => ({type: SIGNUP_FAILURE, hasErrors: true, error});

export const signup = (username, password, passwordVerification) => {
  return function(dispatch) {
    return fetch(`http://localhost:3001/auth/signup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({username, password, passwordVerification})
    }).then(response => response.json()).then(data => {
      data.error
        ? dispatch(signupFailure(data.error))
        : dispatch(signupSuccess(data));
    }).catch(error => error);
  }
}

export const signinSuccess = data => {
  sessionStorage.setItem('jwt', data.token);
  return {type: SIGNIN_SUCCESS, username: data.username, token: data.token}
}

export const signinFailure = error => ({type: SIGNIN_FAILURE, hasErrors: true, error});

export const signin = (username, password) => {
  return function(dispatch) {
    return fetch(`http://localhost:3001/auth/signin`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({username, password})
    }).then(response => response.json()).then(data => {
      data.error
        ? dispatch(signinFailure(data.error))
        : dispatch(signinSuccess(data));
    }).catch(error => error);
  }
}

export const signout = () => {
  sessionStorage.removeItem('jwt');
  return {
    type: SIGNOUT
  };
}

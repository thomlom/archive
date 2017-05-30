const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNOUT = 'SIGNOUT';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_FAILURE:
      return {hasErrors: action.hasErrors, error: action.error, isAuthenticated: false}
    case SIGNUP_SUCCESS:
      return {username: action.username, token: action.token, isAuthenticated: true}
    case SIGNIN_FAILURE:
      return {hasErrors: action.hasErrors, error: action.error, isAuthenticated: false}
    case SIGNIN_SUCCESS:
      return {username: action.username, token: action.token, isAuthenticated: true}
    case SIGNOUT:
      return {isAuthenticated: false};
    default:
      return state;
  }
}

export default userReducer;

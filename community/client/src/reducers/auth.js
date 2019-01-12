import {
    SIGNIN_FAILURE,
    SIGNIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
    SIGNOUT,
    AUTH_USER,
    CLEAR_ERRORS
} from '../actions/auth';

const auth = (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_FAILURE:
            return {
                error: action.error,
                field: action.field,
                isAuthenticated: false
            }
        case SIGNUP_SUCCESS:
            return {
                isAuthenticated: true,
                user: action.user
            }
        case SIGNIN_FAILURE:
            return {
                error: action.error,
                field: action.field,
                isAuthenticated: false
            }
        case SIGNIN_SUCCESS:
            return {
                isAuthenticated: true,
                user: action.user
            }
        case SIGNOUT:
            return {
                isAuthenticated: false
            };
        case AUTH_USER:
            return {
                isAuthenticated: true,
                user: action.user
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                field: null
            }
        default:
            return state;
    }
}

export default auth;
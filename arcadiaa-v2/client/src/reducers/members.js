import {
    LOAD_MEMBERS
} from '../actions/members';

const auth = (state = [], action) => {
    switch (action.type) {
        case LOAD_MEMBERS:
            return [
                ...action.members
            ];
        default:
            return state;
    }
}

export default auth;
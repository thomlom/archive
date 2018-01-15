import axios from 'axios';

export const LOAD_MEMBERS = 'LOAD_MEMBERS';

export const loadMembers = () => dispatch => {
    axios.get('/api/clan/members')
    .then(response => {
        dispatch({
            type: LOAD_MEMBERS,
            members: response.data
        });
    });
}
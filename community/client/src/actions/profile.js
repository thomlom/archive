import axios from 'axios';
import {
    SIGNOUT
} from './auth';

export const deleteAccount = (id) => async dispatch => {
    await axios.delete(`/api/profile/delete/${id}`)
    localStorage.removeItem('jwt');
    dispatch({
        type: SIGNOUT
    });
}
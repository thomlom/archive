const ADD = 'ADD';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';
const LOAD_TRANSACTIONS_SUCCESS = 'LOAD_TRANSACTIONS_SUCCESS';

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state, {
          transactionType: action.transactionType,
          title: action.title,
          amount: action.amount,
          _id: action._id
        }
      ]
    case EDIT:
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === action._id) {
          var index = i;
        }
      }
      return [
        ...state.slice(0, index),
        {
          transactionType: action.transactionType,
          title: action.title,
          amount: action.amount,
          _id: action._id
        },
        ...state.slice(index + 1)
      ]
    case REMOVE:
      return state.filter(transaction => transaction._id !== action._id);
    case LOAD_TRANSACTIONS_SUCCESS:
      return action.transactions;
    default:
      return state;
  }
};

export default transactionReducer;

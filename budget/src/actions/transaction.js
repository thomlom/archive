const ADD = 'ADD';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';
const LOAD_TRANSACTIONS_SUCCESS = 'LOAD_TRANSACTIONS_SUCCESS';

export const editTransactionSuccess = ({_id, title, amount, transactionType}) => ({type: EDIT, title, amount, transactionType, _id})

export const editTransaction = (_id, title, amount) => {
  return function(dispatch) {
    return fetch(`http://localhost:3001/api/transactions/${_id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({title, amount})
    })
    .then(response => response.json())
    .then(transaction => dispatch(editTransactionSuccess(transaction)))
    .catch(error => error);
  }
}

export const removeTransactionSuccess = _id => ({type: REMOVE, _id})

export const removeTransaction = _id => {
  return function(dispatch) {
    return fetch(`http://localhost:3001/api/transactions/${_id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(_id => dispatch(removeTransactionSuccess(_id)))
    .catch(error => error);
  }
}

export const loadTransactionsSuccess = transactions => ({type: LOAD_TRANSACTIONS_SUCCESS, transactions});

export const loadTransactions = () => {
  return function(dispatch) {
    return fetch('http://localhost:3001/api/transactions')
    .then(response => response.json())
    .then(transactions => dispatch(loadTransactionsSuccess(transactions)))
    .catch(error => error);
  };
}

export const addTransactionSuccess = ({title, amount, transactionType, _id}) => ({type: ADD, title, amount, transactionType, _id});

export const addTransaction = (title, transactionType, amount) => {
  return function(dispatch) {
    return fetch('http://localhost:3001/api/transactions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({title, transactionType, amount})
    })
    .then(response => response.json())
    .then(transaction => dispatch(addTransactionSuccess(transaction)))
    .catch(error => error);
  }
}

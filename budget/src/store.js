import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import transactions from './reducers/transactionReducer';
import user from './reducers/userReducer';

const rootReducer = combineReducers({
  transactions,
  user
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;

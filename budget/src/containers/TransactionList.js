import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadTransactions} from '../actions/transaction';
import Transaction from './Transaction';
import {ListGroup} from 'react-bootstrap';
import '../styles/transactionList.css';

class TransactionList extends Component {
  componentDidMount() {
    this.props.loadTransactions();
  }

  render() {
    return (
      <div>
        <p className="transaction-list-title">All your transactions</p>
        <ListGroup>
          {this.props.transactions.map(transaction => <Transaction key={transaction._id} transaction={transaction}/>)}
          {this.props.transactions.length === 0 && <p className="no-transactions-title">No transactions!</p>}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = state => ({transactions: state.transactions});

const mapDispatchToProps = dispatch => ({
  loadTransactions: () => {
    dispatch(loadTransactions());
  }
})

const TransactionListContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionList);

export default TransactionListContainer;

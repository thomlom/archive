import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransactionEdited from '../components/TransactionEdited';
import {editTransaction, removeTransaction} from '../actions/transaction';
import {connect} from 'react-redux';
import {ListGroupItem, Button} from 'react-bootstrap';
import '../styles/transaction.css';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDiscardClick = this.handleDiscardClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleEditClick() {
    this.setState({isEditing: true});
  }

  handleDeleteClick(_id) {
    this.props.deleteTransaction(_id);
  }

  handleDiscardClick() {
    this.setState({isEditing: false});
  }

  handleSubmitClick(_id, title, amount) {
    this.props.submitEditTransaction(_id, title, amount);
    this.setState({isEditing: false});
  }

  render() {
    if (this.state.isEditing) {
      return (<TransactionEdited transaction={this.props.transaction} handleDiscardClick={this.handleDiscardClick} handleSubmitClick={this.handleSubmitClick}/>)
    } else {
      return (
        <ListGroupItem key={this.props.transaction._id} className={`list-group-item transaction ${this.props.transaction.transactionType.toLowerCase()}`}>
          <div className="transaction-informations">
            <p className="transaction-title">{this.props.transaction.title}</p>
            <span className="amount">{this.props.transaction.amount}€</span>
          </div>
          <div className="transaction-settings btn-group">
            <Button bsStyle="default" onClick={this.handleEditClick}>
              <i className="fa fa-edit"></i>
            </Button>
            <Button bsStyle="danger" onClick={() => this.handleDeleteClick(this.props.transaction._id)}>
              <i className="fa fa-trash-o"></i>
            </Button>
          </div>
        </ListGroupItem>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEditTransaction: (_id, title, amount) => {
    dispatch(editTransaction(_id, title, amount))
  },
  deleteTransaction: (_id) => {
    dispatch(removeTransaction(_id));
  }
});

Transaction.propTypes = {
  transaction: PropTypes.object,
  key: PropTypes.string
};

const TransactionContainer = connect(null, mapDispatchToProps)(Transaction);

export default TransactionContainer;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ListGroupItem} from 'react-bootstrap';
import '../styles/transaction.css';

class TransactionEdited extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "title": this.props.transaction.title,
      "amount": this.props.transaction.amount
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDiscardClick = this.handleDiscardClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleTitleChange(event) {
    this.setState({"title": event.target.value});
  }

  handleAmountChange(event) {
    this.setState({"amount": event.target.value});
  }

  handleDiscardClick() {
    this.props.handleDiscardClick();
  }

  handleSubmitClick() {
    if (this.state.title.trim() !== '') {
      this.props.handleSubmitClick(this.props.transaction._id, this.state.title, this.state.amount);
    }
  }

  render() {
    return (
      <ListGroupItem key={this.props.transaction._id} className={`transaction ${this.props.transaction.transactionType.toLowerCase()}`}>
        <div className="transaction-informations">
          <input value={this.state.title} onChange={this.handleTitleChange}/>
          <hr/>
          <input value={this.state.amount} onChange={this.handleAmountChange}/>
        </div>
        <div className="transaction-settings btn-group">
          <Button bsStyle="success" onClick={this.handleSubmitClick}>
            <i className="fa fa-check"></i>
          </Button>
          <Button bsStyle="danger" onClick={this.handleDiscardClick}>
            <i className="fa fa-times"></i>
          </Button>
        </div>
      </ListGroupItem>
    )
  }
}

TransactionEdited.propTypes = {
  transaction: PropTypes.object,
  handleDiscardClick: PropTypes.func,
  handleSubmitClick: PropTypes.func
};

export default TransactionEdited;

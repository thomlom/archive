import React, {Component} from 'react';
import FieldGroup from '../components/FieldGroup';
import {addTransaction} from '../actions/transaction';
import {connect} from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Modal,
  ButtonToolbar,
  Button
} from 'react-bootstrap';

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      amount: ''
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.submitTransaction = this.submitTransaction.bind(this);
    this.getValidationNameState = this.getValidationNameState.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value.trim()});
  }

  handleAmountChange(event) {
    this.setState({amount: event.target.value});
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

  getValidationNameState() {
    return (this.state.title.trim().length === 0) ? "error" : "success";
  }

  getValidationAmountState() {
    return (isNaN(Number(this.state.amount)) || String(this.state.amount).trim().length === 0) ? "error" : "success";
  }

  submitTransaction() {
    let transactionType = document.getElementById('type').value || 'expense';
    if (this.getValidationAmountState() === 'success' && this.getValidationNameState() === 'success') {
      this.props.submitNewTransaction(this.state.title, transactionType, this.state.amount);
      this.setState({title: '', amount: '', show: false});
    }
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModal}>
          Add Transaction
        </Button>
        <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Transaction details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FieldGroup id="name" label="Name" help="Your name should be not empty" validate={this.getValidationNameState()} onChange={this.handleTitleChange}/>
              <FieldGroup id="amount" label="Amount" help="Your amount should be a number" validate={this.getValidationAmountState()} onChange={this.handleAmountChange}/>
              <FormGroup controlId="type">
                <ControlLabel>Type</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </FormControl>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.submitTransaction}>Validate</Button>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  submitNewTransaction: (title, category, amount) => {
    dispatch(addTransaction(title, category, amount))
  }
})

const AddTransactionContainer = connect(null, mapDispatchToProps)(AddTransaction);

export default AddTransactionContainer;

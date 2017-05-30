import React, {Component} from 'react';
import Header from './Header';
import TransactionList from '../containers/TransactionList';
import AddTransaction from '../containers/AddTransaction';
import {signout} from '../actions/user';
import {connect} from 'react-redux';
import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
    this.accessSecret = this.accessSecret.bind(this);
  }

  handleSignout() {
    this.props.signout();
  }

  accessSecret() {
    fetch(`http://localhost:3001/auth/secret`, {
      method: 'GET',
      headers: {
        'Authorization': this.props.user.token
      }
    }).then(response => response.json()).then(data => {
      console.log(data);
    }).catch(error => error);
  }

  render() {
    return (
      <div className="container">
        <Header isAuthenticated={this.props.user.isAuthenticated} handleSignout={this.handleSignout}/>
        <TransactionList/>
        <AddTransaction/>
        <button onClick={this.accessSecret}>Secret</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  signout: () => {
    dispatch(signout());
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;

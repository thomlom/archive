import React, {Component} from 'react';
import FieldGroup from '../components/FieldGroup';
import {Form, Button, Alert} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {signup} from '../actions/user';
import {connect} from 'react-redux';
import '../styles/sign.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordVerification: ''
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordVerificationChange = this.handlePasswordVerificationChange.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handlePasswordVerificationChange(e) {
    this.setState({passwordVerification: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleSubmitClick() {
    this.props.signupUser(this.state.username, this.state.password, this.state.passwordVerification);
  }

  render() {
    if (this.props.user.isAuthenticated) {
      return (
        <Redirect to="/"/>
      )
    }
    return (
      <div>
        <h1 className="text-center">Signup here</h1>
        <Form className="signin-form">
          {this.props.user.hasErrors &&
            <Alert bsStyle="danger">
              <h4>Oops... Something went wrong <i className="fa fa-frown-o"></i></h4>
              <p>{this.props.user.error}</p>
            </Alert>
          }
          <FieldGroup id="username" label="Username" type="text" name="username" onChange={this.handleUsernameChange}/>
          <FieldGroup id="password" label="Password" help="Your password should have at least 6 characters" type="password" name="password" onChange={this.handlePasswordChange}/>
          <FieldGroup id="password-verification" label="Confirm your password" help="Your passwords should be the same" type="password" name="passwordVerification" onChange={this.handlePasswordVerificationChange}/>
          <div className="button-container">
            <Button onClick={this.handleSubmitClick}>Signup</Button>
          </div>
        </Form>
        <p className="text-center no-account">
          <Link to="/signin">Already have an account ?</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  signupUser: (username, password, passwordVerification) => {
    dispatch(signup(username, password, passwordVerification));
  }
});

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;

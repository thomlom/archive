import React, {Component} from 'react';
import FieldGroup from '../components/FieldGroup';
import {Link, Redirect} from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap';
import {signin} from '../actions/user';
import {connect} from 'react-redux';
import '../styles/sign.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleSubmitClick() {
    this.props.signinUser(this.state.username, this.state.password);
  }

  render() {
    if (this.props.user.isAuthenticated) {
      return (
        <Redirect to="/"/>
      )
    }
    return (
      <div>
        <h1 className="text-center">Signin here</h1>
        <Form className="signin-form">
          {this.props.user.hasErrors &&
            <Alert bsStyle="danger">
              <h4>Oops... Something went wrong <i className="fa fa-frown-o"></i></h4>
              <p>{this.props.user.error}</p>
            </Alert>
          }
          <FieldGroup id="username" label="Username" type="text" name="username" onChange={this.handleUsernameChange}/>
          <FieldGroup id="password" label="Password" type="password" name="password" onChange={this.handlePasswordChange}/>
          <div className="button-container">
            <Button onClick={this.handleSubmitClick}>Signin</Button>
          </div>
        </Form>
        <p className="text-center no-account">
          <Link to="/signup">No account ?</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  signinUser: (username, password) => {
    dispatch(signin(username, password));
  }
});

const SigninContainer = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default SigninContainer;

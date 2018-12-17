import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types'
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from './User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes =  {
    resetToken: PropTypes.string.isRequired
  }

  state = {
    password: '',
    confirmPassword: ''
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          ...this.state
        }}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(reset, { error, loading }) => {
          return (
            /* By default, Form sends a get request and put the variables in the URL! */
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                // Reset the form
                this.setState({ password: "", confirmPassword: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placehoder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm your password
                  <input
                    type="password"
                    name="confirmPassword"
                    placehoder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset Password</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Reset;

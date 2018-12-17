import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        /* When the mutation will be successfully finished, it will fetch the user to update the nav bar */
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(signin, { error, loading }) => {
          return (
            /* By default, Form sends a get request and put the variables in the URL! */
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signin();
                // Reset the form
                this.setState({ email: "", password: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In for An Account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    placehoder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  password
                  <input
                    type="password"
                    name="password"
                    placehoder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>

                <button type="submit">Sign In!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;

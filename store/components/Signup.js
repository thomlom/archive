import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(signup, { error, loading }) => {
          return (
            /* By default, Form sends a get request and put the variables in the URL! */
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signup();
                // Reset the form
                this.setState({ name: "", email: "", password: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up for An Account</h2>
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
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placehoder="name"
                    value={this.state.name}
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

                <button type="submit">Sign Up</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;

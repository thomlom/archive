import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => (
  <Mutation
    mutation={ADD_TO_CART_MUTATION}
    variables={{ id }}
    /* Refetch the current user so that the item is displayed in the cart when added */
    refetchQueries={[
      {
        query: CURRENT_USER_QUERY
      }
    ]}
  >
    {(addToCart, { error, loading }) => (
      <button onClick={addToCart} disabled={loading}>Add{loading && 'ing'} To Cart</button>
    )}
  </Mutation>
);

export default AddToCart;

/**
 * Link from next.js make use of HTML5 pushState so that the page doesn't refresh
 * @see https://github.com/zeit/next.js/#with-link
 */
import Link from "next/link";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";

import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import CartCount from "./CartCount";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            {" "}
            {/* Fragment: @see https://reactjs.org/docs/fragments.html */}
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <a onClick={toggleCart}>
                  My Cart
                  <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                </a>
              )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

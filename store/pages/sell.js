/**
 * * Next.js takes care of the routing for us.
 * By putting a page called sell in the pages folder,
 * we can access it like this: localhost:7777/sell
 * If we had a structure like that: pages/order/items,
 * we can access it exactly the same in the URL: localhost:7777/order/items
 *
 * Next.js doesn't load all the pages at first, it builds them on demand
 * So it can seem slower than React Router for example at first
 */
import CreateItem from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn"

const Sell = props => (
  <div>
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  </div>
);

export default Sell;

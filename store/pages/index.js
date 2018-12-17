import Items from "../components/Items";

const Home = props => (
  <div>
    <Items
      page={
        parseFloat(props.query.page) ||
        1 /* If there is no page attribute in the query */
      }
    />
  </div>
);

export default Home;

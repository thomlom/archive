/**
 * Next.js wraps by default the entire app in an App component
 *
 * However, we'll build our own custom App component.
 *
 * Customizing the App component allows us to:
 *
 * Persist layout between page changes
 * Keep state when navigating pages
 * Do custom error handling using componentDidCatch
 * Inject additional data into pages (for example by processing GraphQL queries)
 * @see https://github.com/zeit/next.js/#custom-app
 */

import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import Page from "../components/Page";

class MyApp extends App {
  // Special next.js lifecycle method
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);

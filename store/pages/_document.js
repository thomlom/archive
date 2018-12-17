import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

/**
 * @see https://github.com/zeit/next.js/#custom-document
 */
export default class MyDocument extends Document {
  /* getInitialProps will always run before the render happens */
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    /* Render out the app, crawl every single component along the tree and collect the styles */
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    /* Compiles all the styles into one and dump it onto the page */
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
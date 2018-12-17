/**
 * @see https://github.com/zeit/next.js/#populating-head
 */
import Head from 'next/head'

const Meta = () => (
  <Head>
    {/* Responsive design */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    {/* Add the progress bar animation that loads when switching pages */}
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
  </Head>
)

export default Meta

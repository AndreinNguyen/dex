/* eslint-disable jsx-a11y/iframe-has-title */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { nodes } from 'utils/getRpcUrl'

// TODO: support switch network

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html translate="no">
        <Head>
          {nodes.map((node) => (
            <link key={node} rel="preconnect" href={node} />
          ))}
          {process.env.NEXT_PUBLIC_NODE_PRODUCTION && (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_NODE_PRODUCTION} />
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&amp;display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/images/tokens/SVC.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
          />
          <meta
            name="description"
            content="Savvycoin is a crypto token in multiple chains for SAVVY community providing flexible, fast and low transaction fees for payments, rewards, and investments."
          />
          <meta name="theme-color" content="#14393c" />
          <meta name="twitter:image" content="https://pancakeswap.finance/images/hero.png" />
          <meta
            name="twitter:description"
            content="Savvycoin is a crypto token in multiple chains for SAVVY community providing flexible, fast and low transaction fees for payments, rewards, and investments."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="😊 Decentralized exchange with cross-chain technology" />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
      </Html>
    )
  }
}

export default MyDocument

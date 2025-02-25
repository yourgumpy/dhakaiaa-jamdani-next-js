import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <div id="fb-root"></div>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
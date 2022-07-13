import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>feiker's blog</title>
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
            rel='stylesheet'
          />
          <script
            async
            defer
            data-website-id='8371f278-5ff1-45ce-aac2-2f2d64b975d0'
            src='https://umami-production-a72b.up.railway.app/umami.js'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <title>feiker blog</title>

        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
            rel='stylesheet'
          />
          <link
            rel='shortcut icon'
            href='/favicon.svg'
            type='image/x-icon'
          ></link>

          <script
            async
            src='https://analytics.umami.is/script.js'
            data-website-id='7f523289-000a-4930-84fb-19dc9e34bc31'
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

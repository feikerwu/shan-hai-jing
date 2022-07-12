import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import hljs from 'highlight.js';
import 'highlight.js/styles/mono-blue.css';
import { useLayoutEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useLayoutEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { useEffect } from 'react';

import 'styles/custom.css';

import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, [pageProps]);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics></Analytics>
    </>
  );
}

export default MyApp;

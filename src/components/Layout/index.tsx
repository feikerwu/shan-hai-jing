import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import Nav from '../Nav';

import styles from './index.module.scss';
console.log({ styles });

const Layout = props => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <Nav />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;

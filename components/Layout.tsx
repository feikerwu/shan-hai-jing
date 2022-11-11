import React, { FC, Component } from 'react';
import styles from 'styles/layout.module.css';
import NavBar from './layouts/navbar';
import Footer from './layouts/footer';

const Layout: FC<{ children: any }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <NavBar></NavBar>
      <div>{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;

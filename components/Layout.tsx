import React, { FC, Component } from 'react';
import styles from 'styles/layout.module.css';
import NavBar from './layouts/navbar';
import Footer from './layouts/footer';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <NavBar></NavBar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;

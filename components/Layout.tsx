import React, { FC, Component } from 'react';
import styles from 'styles/layout.module.css';

const Layout: FC<{ children: any }> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;

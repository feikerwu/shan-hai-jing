import React, { FC, Component } from 'react';

import NavBar from './layouts/navbar';
import Footer from './layouts/footer';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='container max-w-[96ch] text-base p-4'>
      <NavBar></NavBar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Link } from 'gatsby';
import GithubCorner from './GithubCorner';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className='main-heading'>
        <Link to='/'>{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className='header-link-home' to='/'>
        {title}
      </Link>
    );
  }

  return (
    <div>
      <GithubCorner></GithubCorner>
      <div className='global-wrapper' data-is-root-path={isRootPath}>
        <header className='global-header'>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href='https://www.gatsbyjs.com'>Gatsby</a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

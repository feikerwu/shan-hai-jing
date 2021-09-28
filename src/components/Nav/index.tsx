import { graphql, Link, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import mail from '@/images/main/envelope.svg';
import github from '@/images/main/social-1_round-github.svg';

import styles from './index.module.scss';

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imgBorder}>
        <div className={styles.imgWrapper}>
          <StaticImage
            src='../../images/main/avatar.png'
            alt='me'
            className={styles.img}
            loading='eager'
            // width={208}
          />
        </div>
      </div>
      <nav className={styles.navList}>
        <p>
          <Link to='/' className={styles.heading}>
            {data.site.siteMetadata.author}
          </Link>
        </p>
        <div className={styles.hr}></div>

        <ul className={styles.navlinkContainer}>
          <li>
            <div className={`${styles.point} ${styles.yellow}`}></div>
            <Link
              to='/'
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              博客{' '}
            </Link>
          </li>
          <li>
            <div className={`${styles.point} ${styles.orange}`}></div>
            <Link
              to='/leetcode'
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              leetcode
            </Link>
          </li>
          {/* <li>
            <div className={`${styles.point} ${styles.crimson}`}></div>
            <Link
              to='/gallery'
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              Gallery
            </Link>
          </li>
          <li>
            <div className={`${styles.point} ${styles.green}`}></div>
            <Link
              to='/about'
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              About Me{' '}
            </Link>
          </li> */}
        </ul>
        <div className={styles.socialContainer}>
          <a
            href='https://github.com/feikerwu'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={github}
              alt='github'
              className={`${styles.socialIcon} ${styles.githubLink}`}
            />
          </a>

          <a href='feikerwu@gmail.com' target='_blank' rel='noreferrer'>
            <img
              src={mail}
              alt='mail'
              className={`${styles.mailIcon} ${styles.mailLink}`}
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

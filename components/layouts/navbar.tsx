import styles from './navbar.module.css';
import Link from 'next/link';

const links = [
  {
    title: 'github',
    url: 'https://github.com/',
  },
];

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link href={'/'} passHref legacyBehavior>
          <div className={styles.title}>{`feiker's blog`}</div>
        </Link>
        <div className={styles.desc}>编程小扎</div>
      </div>

      <div className={styles.navBarRight}>
        {links.map(link => (
          <a href={link.url} key={link.title}>
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavBar;

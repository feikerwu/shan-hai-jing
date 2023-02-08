import styles from './navbar.module.css';
import Link from 'next/link';

const links = [
  {
    title: 'github',
    url: 'https://github.com/feikerwu',
  },
];

const NavBar = () => {
  return (
    <div className='container flex justify-between my-12'>
      <div>
        <Link href={'/'} passHref legacyBehavior>
          <div
            className={`text-3xl font-bold cursor-pointer`}
          >{`feiker's blog`}</div>
        </Link>

        <div>编程小札</div>
      </div>

      <div>
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

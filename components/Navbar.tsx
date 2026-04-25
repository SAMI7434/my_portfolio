import Link from 'next/link';
import styles from './Navbar.module.css';

type NavKey = 'home' | 'service' | 'portfolio' | 'product' | 'contact';

export default function Navbar({ activePage }: { activePage?: string }) {
  const links: { name: string; href: string; key: NavKey }[] = [
    { name: 'Home', href: '/', key: 'home' },
    { name: 'Services', href: '/service', key: 'service' },
    { name: 'Portfolio', href: '/portfolio', key: 'portfolio' },
    { name: 'Products', href: '/product', key: 'product' },
    { name: 'Contact', href: '/contact', key: 'contact' },
  ];

  const normalized = (activePage || '').toLowerCase();
  const aliasToKey: Record<string, NavKey> = {
    home: 'home',
    '/': 'home',
    about: 'service',
    services: 'service',
    service: 'service',
    projects: 'portfolio',
    portfolio: 'portfolio',
    skills: 'product',
    products: 'product',
    product: 'product',
    contact: 'contact',
  };

  const activeKey = aliasToKey[normalized];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Samiran Das
        </Link>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${activeKey === link.key ? styles.active : ''}`.trim()}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.placeholder} aria-hidden="true"></div>
      </div>
    </nav>
  );
}

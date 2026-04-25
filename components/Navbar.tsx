export default function Navbar({ activePage }: { activePage?: string }) {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/service' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Products', href: '/product' },
    { name: 'Contact', href: '/contact' },
  ];

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    listStyle: 'none',
  };

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    textDecoration: isActive ? 'underline' : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: '#333',
  });

  return (
    <nav>
      <ul style={navStyle}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} style={linkStyle(activePage === link.href || (link.href === '/' && activePage === 'home'))}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

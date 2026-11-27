import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home',     href: '#home',      icon: 'fa-house'       },
  { label: 'About',    href: '#about1',    icon: 'fa-user'        },
  { label: 'Services', href: '#services1', icon: 'fa-briefcase'   },
  { label: 'Projects', href: '#projects1', icon: 'fa-folder-open' },
  { label: 'Contact',  href: '#contact1',  icon: 'fa-envelope'    },
];

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('');

  /* ---- Active nav highlight on scroll ---- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          setActiveLink(`#${sec.id}`);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const closeMenu = () => setMenuOpen(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <header className="header">
      <a href="#home" className="logo">
        Sajeesh<span>Alexandar</span>
      </a>

      <i
        className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}
        id="menu-bar"
        role="button"
        tabIndex={0}
        aria-label="Toggle navigation menu"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
      />

      <nav className={`navbar${menuOpen ? ' active' : ''}`} id="navbar1">
        {navItems.map(({ label, href, icon }) => (
          <a
            key={href}
            href={href}
            className={activeLink === href ? 'active-link' : ''}
            onClick={closeMenu}
          >
            <i className={`fa-solid ${icon}`} aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>

      <a className="gradient-btn" href="#contact1">
        <i className="fa-solid fa-paper-plane" aria-hidden="true" />
        Contact me
      </a>
    </header>
  );
}

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import styles from './Header.module.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>&#129463;</span>
          <span className={styles.logoText}>Bright Smile</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/appointment"
            className={`btn btn-primary ${styles.navCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </nav>

        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '&#9790;' : '&#9728;'}
          </button>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}

import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';

const menu = [
  { to: '/', label: 'Home' },
  { to: '/states', label: 'States' },
  { to: '/government', label: 'Government' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const placeholder = useMemo(() => 'Search states, leaders, culture...', []);

  function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setMenuOpen(false);
    navigate(`/states?search=${encodeURIComponent(q)}`);
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <NavLink to="/" className={styles.brand} aria-label="India Info Portal" onClick={() => setMenuOpen(false)}>
            <span className={styles.brandMark} />
            <span className={styles.brandText}>India Info Portal</span>
          </NavLink>

          <nav className={[styles.nav, menuOpen ? styles.navOpen : ''].join(' ')} aria-label="Primary">
            {menu.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : ''].join(' ')
                }
              >
                {m.label}
              </NavLink>
            ))}
          </nav>

          <form className={styles.search} onSubmit={onSubmit} role="search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label="Search"
            />
            <button type="submit" aria-label="Search">
              🔎
            </button>
          </form>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}


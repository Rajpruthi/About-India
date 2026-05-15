import React, { useMemo, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/states?search=${encodeURIComponent(q)}`);
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <NavLink to="/" className={styles.brand} aria-label="India Info Portal">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={styles.brandMark} 
            />
            <span className={styles.brandText}>India Info Portal</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Primary Desktop">
            {menu.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.to === '/'}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {m.label}
                {location.pathname === m.to && (
                  <motion.div layoutId="underline" className={styles.underline} />
                )}
              </NavLink>
            ))}
          </nav>

          <div className={styles.rightSection}>
            <form className={styles.search} onSubmit={onSubmit} role="search">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search India..."
                aria-label="Search"
              />
              <button type="submit" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </form>

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.overlay}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.mobileNav}
            >
              <div className={styles.mobileNavContent}>
                <div className={styles.mobileSearch}>
                   <form onSubmit={onSubmit}>
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                      />
                   </form>
                </div>
                {menu.map((m, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={m.to}
                  >
                    <NavLink
                      to={m.to}
                      end={m.to === '/'}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
                      }
                    >
                      {m.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}


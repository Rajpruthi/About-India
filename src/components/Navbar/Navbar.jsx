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
    <>
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
      </header>

      {/* Mobile Menu - Outside header for better stacking */}
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
              <div className={styles.mobileNavHeader}>
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className={styles.mobileSearch}>
                 <form onSubmit={onSubmit}>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search India..."
                    />
                 </form>
              </div>
              
              <div className={styles.mobileNavContent}>
                {menu.map((m, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={m.to}
                    className={styles.mobileLinkWrapper}
                  >
                    <NavLink
                      to={m.to}
                      end={m.to === '/'}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
                      }
                    >
                      <span className={styles.mobileLinkLabel}>{m.label}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              
              <div className={styles.mobileNavFooter}>
                <p>© {new Date().getFullYear()} India Info Portal</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


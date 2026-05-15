import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner + ' container'}>
        <div className={styles.col}>
          <div className={styles.brand}>India Info Portal</div>
          <div className={styles.muted}>A modern way to explore India — states, history, economy and more.</div>
        </div>

        <div className={styles.col}>
          <div className={styles.title}>Quick Links</div>
          <Link className={styles.link} to="/">Home</Link>
          <Link className={styles.link} to="/states">States</Link>
          <Link className={styles.link} to="/government">Government</Link>
          <Link className={styles.link} to="/about">About</Link>
        </div>

        <div className={styles.col}>
          <div className={styles.title}>Contact</div>
          <div className={styles.muted}>pruthirajrout843@gmail.com</div>
          <div className={styles.muted}>+91 72057 46680</div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} India Info Portal. Built with ❤️ for India.</span>
        </div>
      </div>
    </footer>
  );
}



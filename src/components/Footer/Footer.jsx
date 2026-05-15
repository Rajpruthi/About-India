import React from 'react';
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
          <div className={styles.title}>Links</div>
          <a className={styles.link} href="/">Home</a>
          <a className={styles.link} href="/states">States</a>
          <a className={styles.link} href="/government">Government</a>
        </div>

        <div className={styles.col}>
          <div className={styles.title}>Contact</div>
          <div className={styles.muted}>info@indiainf oportal.example</div>
          <div className={styles.muted}>+91 72057 46680</div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} India Info Portal. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}



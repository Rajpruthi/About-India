import React from 'react';
import { Link } from 'react-router-dom';
import styles from './infoCard.module.css';

export function InfoCard({ title, to, icon, description, onClick, rightSlot }) {
  const content = (
    <div className={styles.inner}>
      <div className={styles.icon} aria-hidden="true">
        {icon ?? '✨'}
      </div>

      <div className={styles.meta}>
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.desc}>{description}</div> : null}
      </div>

      <div className={styles.right}>
        {rightSlot ? rightSlot : <div className={styles.chev}>→</div>}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={styles.card} aria-label={title}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.card} aria-label={title} onClick={onClick}>
      {content}
    </button>
  );
}


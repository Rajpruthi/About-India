import React from 'react';
import { Link } from 'react-router-dom';
import styles from './stateCard.module.css';

export function StateCard({ state }) {
  return (
    <Link
      to={`/states/${state.slug}`}
      className={styles.card}
      aria-label={`Open ${state.name}`}
    >
      <div className={styles.icon} aria-hidden="true">
        {state.icon ?? '🏛️'}
      </div>
      <div className={styles.name}>{state.name}</div>
    </Link>
  );
}


import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './cmChiefCard.module.css';
import { RealTimeCMImage } from '../RealTimeCMImage/RealTimeCMImage.jsx';

export function CMChiefCard({ stateSlug, stateName, currentCM }) {
  const navigate = useNavigate();

  const safe = {
    name: currentCM?.name ?? 'Chief Minister',
    designation: currentCM?.designation ?? 'Chief Minister',
    description: currentCM?.description ?? '',
    img: currentCM?.img ?? null,
    party: currentCM?.party ?? '',
  };

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/state/${stateSlug}/ex-chief-ministers`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/state/${stateSlug}/ex-chief-ministers`);
        }
      }}
      aria-label={`View Ex-Chief Ministers of ${stateName}`}
    >
      <div className={styles.left}>
        <div className={styles.kicker}>Chief Minister (CM)</div>
        <h2 className={styles.h2}>{safe.name}</h2>
        <div className={styles.meta}>
          <span className={styles.badge}>{safe.designation}</span>
          {safe.party ? <span className={styles.badgeAlt}>{safe.party}</span> : null}
        </div>
        <div className={styles.stateLine}>{stateName}</div>
        {safe.description ? <p className={styles.desc}>{safe.description}</p> : null}
      </div>

      <div className={styles.right}>
        <RealTimeCMImage 
          name={safe.name} 
          className={styles.photo} 
          fallbackClassName={styles.photoFallback} 
        />
      </div>

      <div className={styles.cornerIcon} aria-hidden="true">
        ➜
      </div>
    </div>
  );
}


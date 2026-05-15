import React from 'react';
import styles from './aboutPage.module.css';
import { AboutHistoryEras } from './AboutHistoryEras.jsx';
import { FREEDOM_FIGHTERS } from '../../data/freedomFighters.js';

function FreedomCard({ f }) {
  return (
    <article className={styles.card3d}>
      <div className={styles.cardInner}>
        <div className={styles.cardMedia}>
          <img className={styles.cardImg} src={f.image} alt={f.name} loading="lazy" />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardName}>{f.name}</div>
          <div className={styles.cardRole}>{f.role}</div>
          <div className={styles.cardDetails}>{f.details}</div>
        </div>
      </div>
    </article>
  );
}

export function AboutPage() {
  // Debug only: verify runtime image URLs
  // eslint-disable-next-line no-console
  console.log('FREEDOM_FIGHTERS[0]=', FREEDOM_FIGHTERS?.[0]);

  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <div className={styles.container + ' container'}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.h1}>About India</h1>
              <p className={styles.lead}>
                India’s history is a story of ideas, courage, reform, and freedom. From ancient civilizations to a
                modern democracy, every era shaped the nation we live in today.
              </p>

              <div className={styles.timeline}>
                <div className={styles.tItem}>
                  <div className={styles.tDot} />
                  <div>
                    <div className={styles.tTitle}>Ancient India</div>
                    <div className={styles.tSub}>Culture, knowledge, trade, and innovation.</div>
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tDot} />
                  <div>
                    <div className={styles.tTitle}>Medieval & Renaissance</div>
                    <div className={styles.tSub}>Architecture, literature, and diverse traditions.</div>
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tDot} />
                  <div>
                    <div className={styles.tTitle}>Independence Movement</div>
                    <div className={styles.tSub}>Non-violence, revolutions, and determination.</div>
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tDot} />
                  <div>
                    <div className={styles.tTitle}>Modern India</div>
                    <div className={styles.tSub}>Democracy, development, and unity.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroOrbWrap} aria-hidden="true">
              <div className={styles.heroOrb} />
              <div className={styles.heroOrb2} />
              <div className={styles.heroGlow} />
            </div>
          </div>
        </div>
      </section>

      <AboutHistoryEras />

      <section className={styles.section}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Freedom Fighters of India</h2>
            <div className={styles.sectionSub}>A tribute to the people who fought for freedom.</div>
          </div>

          <div className={styles.grid}>
            {FREEDOM_FIGHTERS.map((f) => (
              <FreedomCard key={f.name} f={f} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


import React from 'react';
import styles from './economyPage.module.css';
import { useNavigate } from 'react-router-dom';

const faq = [
  {
    q: 'How accurate is the data? ',
    a: 'The data for economic growth, GDP contribution, exports, crime rates, and state-wise development is usually highly reliable when taken from official government and international sources, but the accuracy depends on the source and the year.'
  },
  {
    q: 'Can I explore states?',
    a: 'Yes. Navigate to “India Economy Overview” and click any state card to open detailed state insights.'
  },
  {
    q: 'Does this page affect other sections?',
    a: 'No. The economy dashboard is isolated under /economy routes only.'
  }
];

export function EconomyPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg} aria-hidden="true" />
        <div className={styles.container + ' container'}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <div className={styles.kicker}>Economy • India Dashboard</div>
              <h1 className={styles.h1}>Economy of India</h1>
              <p className={styles.lead}>
                Explore India’s economic power—growth, trade, innovation, and development—through a modern
                analytics dashboard designed for speed and clarity.
              </p>

              <div className={styles.ctaRow}>
                <button className={styles.primaryBtn} onClick={() => navigate('/economy/india')}>
                  Explore India Economy
                </button>
                <button className={styles.secondaryBtn} onClick={() => navigate('/economy/india')}>
                  View States
                </button>
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaCard}>
                  <div className={styles.metaLabel}>GDP Rank</div>
                  <div className={styles.metaValue}>Top 6</div>
                </div>
                <div className={styles.metaCard}>
                  <div className={styles.metaLabel}>Trade Position</div>
                  <div className={styles.metaValue}>Global Top Tier</div>
                </div>
                <div className={styles.metaCard}>
                  <div className={styles.metaLabel}>Growth Momentum</div>
                  <div className={styles.metaValue}>Steady Expansion</div>
                </div>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.panelTop}>
                <div className={styles.panelTitle}>Live Indicators (Demo)</div>
                <div className={styles.pulseDot} aria-hidden="true" />
              </div>

              <div className={styles.panelGrid}>
                <div className={styles.smallCard}>
                  <div className={styles.smallLabel}>GDP</div>
                  <div className={styles.smallValue}>$4.15T</div>
                </div>
                <div className={styles.smallCard}>
                  <div className={styles.smallLabel}>Per Capita</div>
                  <div className={styles.smallValue}>₹2.15 L</div>
                </div>
                <div className={styles.smallCard}>
                  <div className={styles.smallLabel}>Inflation</div>
                  <div className={styles.smallValue}>3.48% in April 2026</div>
                </div>
                <div className={styles.smallCard}>
                  <div className={styles.smallLabel}>Growth</div>
                  <div className={styles.smallValue}>7.4% in 2025-26</div>
                </div>
              </div>

              <div className={styles.panelFooter}>
                <div className={styles.panelFooterText}>Interactive charts, filters, and state comparisons in one place.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>What you can do</h2>
            <div className={styles.sectionSub}>A dedicated, isolated economy experience.</div>
          </div>

          <div className={styles.faqGrid}>
            {faq.map((item) => (
              <div key={item.q} className={styles.faqCard}>
                <div className={styles.faqQ}>{item.q}</div>
                <div className={styles.faqA}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


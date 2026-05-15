import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './governmentLeaderPage.module.css';
import leaders from '../../data/government.json';
import { presidentHistory, homeMinisterHistory } from '../../data/government-history.json';
import { primeMinisterHistoryPatched } from '../../data/government-history.pm-portraits.js';

import { presidentHistoryPatched } from '../../data/government-history.portraits.js';
import { homeMinisterHistoryPatched } from '../../data/government-history.hm-portraits.js';
import indiaPlaceholderImg from '../../assets/India.jpg';
import neutralAvatarImg from '../../assets/India.jpg';

function useLoadingOnMount() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  return loading;
}

const HISTORY_BY_ROLE = {
  president: presidentHistoryPatched,
  'prime-minister': primeMinisterHistoryPatched,
  'home-minister': homeMinisterHistoryPatched,
};

export function GovernmentLeaderPage() {
  const { leaderSlug } = useParams();
  const loading = useLoadingOnMount();

  const currentLeader = useMemo(() => {
    // current leaders are stored as {president, primeMinister, homeMinister, mpMembers}
    // NOTE: mpMembers in government.json does NOT represent a single leader and may not have `slug/term/bio/image` fields.
    const all = Object.values(leaders).filter(
      (v) => v && typeof v === 'object' && typeof v.slug === 'string'
    );

    // Accept both raw slugs (e.g. `president`) and common URL variants (e.g. `prime-minister`).
    return (
      all.find((l) => l.slug === leaderSlug) ??
      all.find((l) => l.slug === decodeURIComponent(leaderSlug))
    );
  }, [leaderSlug]);



  const historyList = useMemo(() => {
    const list = HISTORY_BY_ROLE[leaderSlug];
    return Array.isArray(list) ? list : [];
  }, [leaderSlug]);

  const [activeHistorySlug, setActiveHistorySlug] = useState(null);

  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    setActiveHistorySlug(null);
    setShowLearnMore(false);
  }, [leaderSlug]);

  useEffect(() => {
    setShowLearnMore(false);
  }, [activeHistorySlug]);

  const activePerson = useMemo(() => {
    const pick = !historyList.length || !activeHistorySlug
      ? currentLeader
      : historyList.find((p) => p.slug === activeHistorySlug) ?? currentLeader;

    // Normalize image field: some entries use `Image` (capital I) instead of `image`.
    if (pick && typeof pick === 'object') {
      if (!('image' in pick) && 'Image' in pick) {
        return { ...pick, image: pick.Image };
      }
      // Also handle cases where both exist but `image` is missing/empty.
      if ('image' in pick && !pick.image && 'Image' in pick) {
        return { ...pick, image: pick.Image };
      }
    }
    return pick;
  }, [activeHistorySlug, currentLeader, historyList]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container + ' container'}>
          <div className={styles.skeleton} />
        </div>
      </div>
    );
  }

  // Special case for mp-members
  if (leaderSlug === 'mp-members') {
    const mpList = leaders.mpMembers?.["Lok Sabha Members List"] || [];
    return (
      <div className={styles.page}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead} style={{ marginBottom: 20 }}>
            <h1 className={styles.h1}>Members of Parliament</h1>
            <p className={styles.sub}>Representatives in Lok Sabha</p>
          </div>
          
          <div className={styles.mpGrid}>
            {mpList.map((mp, idx) => (
              <div key={mp.slug || idx} className={styles.mpCard}>
                <div className={styles.mpImageWrap}>
                  <img 
                    src={mp.image || neutralAvatarImg} 
                    alt={mp.name} 
                    className={styles.mpImage}
                    onError={(e) => { e.currentTarget.src = neutralAvatarImg; }}
                  />
                  <div className={styles.mpPartyBadge} data-party={mp.party}>{mp.party}</div>
                </div>
                <div className={styles.mpContent}>
                  <div className={styles.mpName}>{mp.name}</div>
                  <div className={styles.mpRole}>{mp.constituency}</div>
                  <div className={styles.mpTerm}>{mp.term}</div>
                  <div className={styles.mpBio}>{mp.bio.length > 100 ? mp.bio.substring(0, 100) + '...' : mp.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentLeader) {
    return (
      <div className={styles.page}>
        <div className={styles.container + ' container'}>
          <h1 className={styles.h1}>Leader not found</h1>
        </div>
      </div>
    );
  }

  // Normalize current leader as well (some sources might use `Image`).
  const normalizedCurrentLeader = activePerson ?? currentLeader;
  const currentRoleLabel = normalizedCurrentLeader?.role ?? currentLeader?.role ?? 'Leader';


  return (
    <div className={styles.page}>
      {/* 3D Background Orbs */}
      <div className={styles.bgContainer}>
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className={`${styles.orb} ${styles.orb1}`} 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0], 
            y: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className={`${styles.orb} ${styles.orb2}`} 
        />
      </div>

      <div className={styles.container + ' container'}>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              {(() => {
                const rawSrc =
                  activePerson?.image ||
                  activePerson?.Image ||
                  currentLeader?.image ||
                  currentLeader?.Image;

                // Only show a placeholder if the image URL is missing.
                // If a URL is provided but fails to load, we show a neutral avatar instead of the Indian flag.
                const imageSrc = rawSrc || neutralAvatarImg;

                return (
                  <img
                    className={styles.image}
                    src={imageSrc}
                    alt={activePerson?.name || currentLeader?.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;

                      // If we started with placeholder already, keep it.
                      if (e.currentTarget.src !== neutralAvatarImg) {
                        e.currentTarget.src = neutralAvatarImg;
                      }
                    }}
                  />
                );

              })()}
            </div>

            <div className={styles.content}>
              <div className={styles.role}>{currentRoleLabel}</div>
              <h1 className={styles.h1}>{activePerson.name}</h1>
              <div className={styles.term}>Term: {activePerson.term}</div>
              <div className={styles.bio}>{activePerson.bio}</div>

              <AnimatePresence>
                {showLearnMore && activePerson.detailedWork && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={styles.detailedWork}
                  >
                    <h3 className={styles.workTitle}>Key Achievements & Work:</h3>
                    <ul className={styles.workList}>
                      {activePerson.detailedWork.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.actions}>
                {activePerson.detailedWork && (
                  <button 
                    className={styles.btn} 
                    onClick={() => setShowLearnMore(!showLearnMore)}
                  >
                    {showLearnMore ? 'Show Less' : 'Learn More'}
                  </button>
                )}
                <a className={styles.btnOutline} href="#" onClick={(e) => e.preventDefault()}>
                  View Parliament Info
                </a>
              </div>
            </div>
          </div>

          <div className={styles.history}>
            <div className={styles.sectionHead}>Presidence / PM / HM History</div>
            <div className={styles.historySub}>Current first, then previous leaders with service years.</div>

            <div className={styles.historyList}>
              <button
                type="button"
                className={
                  styles.historyItem + ' ' + (!activeHistorySlug ? styles.historyItemActive : '')
                }
                onClick={() => setActiveHistorySlug(null)}
              >
                <div className={styles.historyName}>{currentLeader.name}</div>
                <div className={styles.historyTerm}>{currentLeader.term}</div>
              </button>

              {historyList.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  className={
                    styles.historyItem +
                    ' ' +
                    (activeHistorySlug === p.slug ? styles.historyItemActive : '')
                  }
                  onClick={() => setActiveHistorySlug(p.slug)}
                >
                  <div className={styles.historyName}>{p.name}</div>
                  <div className={styles.historyTerm}>{p.term}</div>
                </button>
              ))}
            </div>

            {activeHistorySlug ? (
              <div className={styles.activeDetails}>
                <div className={styles.activeBioTitle}>About selected leader</div>
                <div className={styles.activeBio}>{activePerson.bio}</div>
                <div className={styles.activeYear}>{activePerson.term}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}




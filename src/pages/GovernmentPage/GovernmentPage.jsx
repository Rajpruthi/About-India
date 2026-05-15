import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './governmentPage.module.css';
import stylesMinistry from './governmentPage.ministry.module.css';
import leaders from '../../data/government.json';
import { InfoCard } from '../../components/InfoCard/InfoCard.jsx';
import { MINISTRIES_DUMMY } from './government-ministry-data.js';

export function GovernmentPage() {
  const [activeMinistryId, setActiveMinistryId] = useState(null);

  const items = useMemo(
    () => [
      { key: 'president', data: leaders.president, icon: '👑', to: `/government/${leaders.president.slug}` },
      { key: 'primeMinister', data: leaders.primeMinister, icon: '🎖️', to: `/government/${leaders.primeMinister.slug}` },
      { key: 'homeMinister', data: leaders.homeMinister, icon: '🛡️', to: `/government/${leaders.homeMinister.slug}` },
      { key: 'mpMembers', data: leaders.mpMembers, icon: '🏛️', to: `/government/${leaders.mpMembers.slug}` },
    ],
    []
  );

  return (
    <div className={styles.page}>
      {/* 3D Background Orbs */}
      <div className={styles.bgContainer}>
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`${styles.orb} ${styles.orb1}`} 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`${styles.orb} ${styles.orb2}`} 
        />
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`${styles.orb} ${styles.orb3}`} 
        />
      </div>

      <div className={styles.container + ' container'}>
        <div className={styles.head}>
          <h1 className={styles.h1}>Know Your Government</h1>
          <p className={styles.sub}>Browse key leaders and understand their roles.</p>
        </div>

        <div className={styles.grid}>
          {items.map((it) => (
            <InfoCard
              key={it.key}
              title={it.data.name}
              to={it.to}
              icon={it.icon}
              description={it.data.role}
            />
          ))}
        </div>

        <section style={{ marginTop: 56 }}>
          <div className={styles.sectionHead} style={{ marginBottom: 24 }}>
            <h2 className={styles.h2} style={{ fontSize: 26 }}>Union Ministries of India</h2>
            <div className={styles.sectionSub}>Comprehensive directory of Union Ministries. Click a card to expand details inside.</div>
          </div>

          <motion.div layout className={stylesMinistry.grid3d}>
            {MINISTRIES_DUMMY.map((m) => {
              const isActive = activeMinistryId === m.id;
              
              return (
                <motion.div
                  layout
                  key={m.id}
                  className={`${stylesMinistry.card3d} ${isActive ? stylesMinistry.activeCard : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => !isActive && setActiveMinistryId(m.id)}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className={stylesMinistry.cardHeader}>
                    <motion.div layout className={stylesMinistry.cardIcon}>{m.icon}</motion.div>
                    <div className={stylesMinistry.cardInfo}>
                      <motion.div layout className={stylesMinistry.cardTitle}>{m.name}</motion.div>
                      <motion.div layout className={stylesMinistry.cardMinister}>{m.minister}</motion.div>
                      {!isActive && <div className={stylesMinistry.cardPeriod}>{m.period}</div>}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={stylesMinistry.innerDetails}>
                          <div>
                            <h4 className={stylesMinistry.sectionTitle}>🎯 Responsibilities</h4>
                            <ul className={stylesMinistry.list}>
                              {m.responsibilities.map((res, i) => (
                                <li key={i} className={stylesMinistry.listItem}>{res}</li>
                              ))}
                            </ul>

                            <h4 className={stylesMinistry.sectionTitle} style={{ marginTop: 20 }}>🏢 Departments</h4>
                            <ul className={stylesMinistry.list}>
                              {m.departments.map((dept, i) => (
                                <li key={i} className={stylesMinistry.listItem}>{dept}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className={stylesMinistry.sectionTitle}>🚀 Key Schemes</h4>
                            <div className={stylesMinistry.schemes}>
                              {m.schemes.map((scheme, i) => (
                                <div key={i} className={stylesMinistry.scheme}>
                                  <div className={stylesMinistry.schemeName}>
                                    <span>{scheme.icon}</span> {scheme.name}
                                  </div>
                                  <p className={stylesMinistry.schemeDesc}>{scheme.description}</p>
                                  <div className={stylesMinistry.schemeMeta}>
                                    <span>{scheme.year}</span>
                                    <span>{scheme.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button 
                          className={stylesMinistry.closeBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMinistryId(null);
                          }}
                        >
                          Close Details
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

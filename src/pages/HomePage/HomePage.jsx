import React from 'react';
import styles from './homePage.module.css';
import { InfoCard } from '../../components/InfoCard/InfoCard.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import overview from '../../data/overview.json';
import indiaMapImg from '../../assets/India.jpg';


function useFakeNavigationLoading() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => setLoading(true);
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);
  return { loading, setLoading };
}

export function HomePage() {
  const [historyOpen, setHistoryOpen] = useState(false);

  const navigate = useNavigate();
  const { loading, setLoading } = useFakeNavigationLoading();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const x1 = useTransform(useSpring(mouseX, { stiffness: 50, damping: 20 }), [-1, 1], [-60, 60]);
  const y1 = useTransform(useSpring(mouseY, { stiffness: 50, damping: 20 }), [-1, 1], [-60, 60]);
  const x2 = useTransform(useSpring(mouseX, { stiffness: 50, damping: 20 }), [-1, 1], [80, -80]);
  const y2 = useTransform(useSpring(mouseY, { stiffness: 50, damping: 20 }), [-1, 1], [80, -80]);
  const rotateX = useTransform(useSpring(mouseY, { stiffness: 50, damping: 20 }), [-1, 1], [15, -15]);
  const rotateY = useTransform(useSpring(mouseX, { stiffness: 50, damping: 20 }), [-1, 1], [-15, 15]);

  const features = [
    {
      title: 'History of India',
      to: '/history-eras',
      icon: '📜',
      description: 'Explore Ancient to Modern India in an interactive 3D view.',
      kind: 'history',
    },
    { title: 'Economy', to: '/economy', icon: '📈', description: 'Trade, growth and development.' },
    { title: 'Culture', to: '/culture', icon: '🎨', description: 'Languages, arts and traditions.' },
    { title: 'Tourism', to: '/tourism', icon: '✈️', description: 'Destinations across every region.' },

  ];


  return (
    <div className={styles.page} onMouseMove={handleMouseMove}>
      <div className={styles.bg3DContainer}>
        <motion.div className={styles.shape1} style={{ x: x1, y: y1, rotateX, rotateY }} />
        <motion.div className={styles.shape2} style={{ x: x2, y: y2, rotateX, rotateY }} />
        <motion.div 
          className={styles.shape3} 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} 
        />
      </div>

      <section className={styles.hero}>
        <div className={styles.container + ' container'}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.h1}>Explore India with ease</h1>
              <p className={styles.lead}>
                Discover states, union territories, leaders and essential facts — in a modern, mobile-first interface.
              </p>
              <div className={styles.pills}>
                <div className={styles.pill}>
                  <div className={styles.pillLabel}>Total Area</div>
                  <div className={styles.pillValue}>{overview.india.totalArea}</div>
                </div>
                <div className={styles.pill}>
                  <div className={styles.pillLabel}>Total Population</div>
                  <div className={styles.pillValue}>{overview.india.totalPopulation}</div>
                </div>
              </div>

              <button
                className={styles.cta}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => navigate('/states'), 250);
                }}
                disabled={loading}
              >
                {loading ? 'Loading…' : 'Explore India'}
              </button>
            </div>

            <div className={styles.mapWrap}>
              <div className={styles.mapCard}>
                <img
                  className={styles.map}
                  src={indiaMapImg}
                  alt="Map of India"
                  loading="eager"
                />

                <div className={styles.mapOverlay}>
                  <div className={styles.overlayItem}>
                    <div className={styles.overlayLabel}>Total Area</div>
                    <div className={styles.overlayValue}>{overview.india.totalArea}</div>
                  </div>
                  <div className={styles.overlayItem}>
                    <div className={styles.overlayLabel}>Total Population</div>
                    <div className={styles.overlayValue}>{overview.india.totalPopulation}</div>
                  </div>
                </div>
              </div>

              <div className={styles.heroBadges}>
                <span className={styles.badge}>🟠 Saffron UI</span>
                <span className={styles.badge}>🟢 Green Nation</span>
                <span className={styles.badge}>🇮🇳 Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Featured</h2>
            <div className={styles.sectionSub}>Quick links to explore more.</div>
          </div>

          <div className={styles.grid4}>
            {features.map((f) => {
              const isHistory = f.title === 'History of India';
              return (
                <InfoCard
                  key={f.title}
                  title={f.title}
                  to={f.to}
                  icon={f.icon}
                  description={isHistory ? 'Read history (click)' : f.description}
                  onClick={isHistory ? () => setHistoryOpen(true) : undefined}
                  rightSlot={isHistory ? <span style={{ fontWeight: 900, color: 'rgba(27,42,74,0.45)' }}>＋</span> : undefined}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Know Your Government</h2>
            <div className={styles.sectionSub}>Meet the key leaders driving the nation.</div>
          </div>

          <div className={styles.grid3}>
            <InfoCard title="President" to="/government/president" icon="👑" />
            <InfoCard title="Prime Minister" to="/government/prime-minister" icon="🎖️" />
            <InfoCard title="Home Minister" to="/government/home-minister" icon="🛡️" />
            <InfoCard title="Members of Parliament (MPs)" to="/government/mp-members" icon="🏛️" />
          </div>
        </div>
      </section>
    </div>
  );
}


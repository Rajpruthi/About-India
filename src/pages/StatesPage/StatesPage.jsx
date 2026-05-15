import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './statesPage.module.css';
import states from '../../data/states.json';
import { StateCard } from '../../components/StateCard/StateCard.jsx';
import { useLocation } from 'react-router-dom';

function parseSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('search') ?? '';
}

export function StatesPage() {
  const [query, setQuery] = useState('');
  const location = useLocation();

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

  const initial = useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      return params.get('search') ?? '';
    } catch {
      return '';
    }
  }, [location.search]);

  React.useEffect(() => {
    setQuery(initial);
  }, [initial]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return states;
    return states.filter((s) => s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q));
  }, [query]);

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
          <h1 className={styles.h1}>States & Union Territories</h1>
          <p className={styles.sub}>Click any card to view details like capital, population, area and famous places.</p>

          <div className={styles.searchRow}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a state or UT…"
              aria-label="Search states"
            />
            <button type="button" className={styles.clearBtn} onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.container + ' container'}>
          <div className={styles.grid}>
            {filtered.map((st) => (
              <StateCard key={st.slug} state={st} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


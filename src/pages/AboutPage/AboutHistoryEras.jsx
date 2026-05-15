import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './aboutPage.module.css';

const ERAS = [
  {
    id: 'ancient-india',
    label: 'Ancient India',
    subtitle: 'Culture, knowledge, trade, and innovation.',
    bullets: ['Vedic and classical learning traditions', 'Trade routes and vibrant cities', 'Mathematics, astronomy, and medicine', 'Craftsmanship and architectural ideas'],
  },
  {
    id: 'medieval-renaissance',
    label: 'Medieval & Renaissance',
    subtitle: 'Architecture, literature, and diverse traditions.',
    bullets: ['Temple, fort, and palace architecture', 'Languages, poetry, and storytelling', 'Cultural syncretism across regions', 'Science and engineering progress'],
  },
  {
    id: 'independence-movement',
    label: 'Independence Movement',
    subtitle: 'Non-violence, revolutions, and determination.',
    bullets: ['Non-violent resistance and mass mobilization', 'Revolutions and courageous movements', "People’s unity and resilience", 'A determined push for self-rule'],
  },
  {
    id: 'modern-india',
    label: 'Modern India',
    subtitle: 'Democracy, development, and unity.',
    bullets: ['Democratic institutions and civic participation', 'Economic growth and social reforms', 'National integration and unity in diversity', 'Innovation and global engagement'],
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const update = () => setReduced(Boolean(mq.matches));
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export function AboutHistoryEras() {
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  const [activeId, setActiveId] = useState(ERAS[0].id);
  const active = useMemo(() => ERAS.find((e) => e.id === activeId) ?? ERAS[0], [activeId]);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  return (
    <section className={styles.section}>
      <div className={styles.container + ' container'}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Indian Eras</h2>
          <div className={styles.sectionSub}>Click an era to open its full theme (3D).</div>
        </div>

        <div className={styles.erasLayout}>
          <div className={styles.erasListWrap}>
            {ERAS.map((e) => {
              const isActive = e.id === activeId;
              return (
                <button
                  key={e.id}
                  type="button"
                  className={[styles.eraPick, isActive ? styles.eraPickActive : ''].join(' ')}
                  onClick={() => setActiveId(e.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.eraPickLabel}>{e.label}</span>
                  <span className={styles.eraPickArrow} aria-hidden="true">
                    {isActive ? '↘' : '→'}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              className={styles.eraGoBtn}
              onClick={() => navigate('/history-eras')}
              aria-label="Open full History eras page"
            >
              Open full page →
            </button>
          </div>

          <div
            className={styles.eraDetail3d}
            onMouseMove={(ev) => {
              if (reducedMotion) return;
              const rect = ev.currentTarget.getBoundingClientRect();
              const px = (ev.clientX - rect.left) / rect.width;
              const py = (ev.clientY - rect.top) / rect.height;
              const ry = (px - 0.5) * 14;
              const rx = -(py - 0.5) * 14;
              setTilt({ rx, ry });
            }}
            onMouseLeave={() => {
              if (reducedMotion) return;
              setTilt({ rx: 0, ry: 0 });
            }}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: reducedMotion ? 'none' : 'transform 220ms ease',
            }}
          >
            <div className={styles.eraGlow} aria-hidden="true" />
            <div className={styles.eraDetailTop}>
              <div className={styles.eraDetailBadge}>{active.label}</div>
              <div className={styles.eraDetailSubtitle}>{active.subtitle}</div>
            </div>

            <div className={styles.eraDetailBody}>
              <h3 className={styles.eraDetailTitle}>{active.label}</h3>
              <ul className={styles.eraDetailBullets}>
                {active.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div className={styles.eraDetailLayers} aria-hidden="true">
              <div className={styles.eraLayerA} />
              <div className={styles.eraLayerB} />
              <div className={styles.eraLayerC} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


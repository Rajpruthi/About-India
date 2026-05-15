import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './chiefMinisterHistoryPage.module.css';
import states from '../../data/states.json';
import exChiefMinistersByState from '../../data/ex-chief-ministers.json';

const DEMO_FALLBACK = {
  current: {
    label: '2019-present',
    exChiefMinisters: ['Ex CM 1', 'Ex CM 2'],
  },
};

export function ChiefMinisterHistoryPage() {
  const { stateSlug } = useParams();

  const state = useMemo(() => states.find((s) => s.slug === stateSlug), [stateSlug]);

  const data = useMemo(() => {
    const byState = exChiefMinistersByState || {};
    return byState[stateSlug] ?? null;
  }, [stateSlug]);

  const periods = useMemo(() => {
    if (!data) return [DEMO_FALLBACK.current];
    const list = Array.isArray(data.periods) ? data.periods : [];
    if (list.length) return list;

    if (data.current) return [data.current];
    return [DEMO_FALLBACK.current];
  }, [data]);

  const [activeIdx, setActiveIdx] = useState(0);
  const active = periods[Math.min(activeIdx, periods.length - 1)] ?? periods[0];

  return (
    <div className={styles.page}>
      <div className={styles.container + ' container'}>
        <div className={styles.header}>
          <div className={styles.icon} aria-hidden="true">
            📜
          </div>
          <div>
            <h1 className={styles.h1}>Ex-Chief Ministers</h1>
            <div className={styles.sub}>
              {state ? `${state.name} (${stateSlug})` : `State: ${stateSlug}`}
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.periodRow}>
            {periods.map((p, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={`${p.label}-${idx}`}
                  type="button"
                  className={isActive ? styles.periodBtnActive : styles.periodBtn}
                  onClick={() => setActiveIdx(idx)}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className={styles.listWrap}>
            <div className={styles.listHead}>Period: {active?.label ?? '-'}</div>
            <div className={styles.list}>
              {(active?.exChiefMinisters ?? []).map((name) => (
                <div key={name} className={styles.item}>
                  {name}
                </div>
              ))}
              {(!active?.exChiefMinisters || active.exChiefMinisters.length === 0) && (
                <div className={styles.empty}>No demo data available for this period.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


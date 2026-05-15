import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import styles from './exChiefMinistersPage.module.css';
import states from '../../data/states.json';
import stateChiefMinisters from '../../data/state-chief-ministers.json';
import { RealTimeCMImage } from '../../components/RealTimeCMImage/RealTimeCMImage.jsx';

function parseServingRange(item) {
  const from = item?.from;
  const to = item?.to;
  if (from && to) return `${from} - ${to}`;
  if (from && !to) return `${from} - Present`;
  if (!from && to) return `Until ${to}`;
  return item?.label ?? '-';
}

function renderExtraFieldsForUT(item) {
  if (!item || typeof item !== 'object') return null;

  // Normal entries typically have name/party/period fields.
  const ignoreKeys = new Set([
    'name',
    'party',
    'designation',
    'from',
    'to',
    'label',
    'period',
    'image',
    'img',
  ]);

  const entries = Object.entries(item)
    .filter(([k, v]) => !ignoreKeys.has(k))
    .filter(([_, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => ({ key: k, value: String(v) }));

  if (!entries.length) return null;

  return (
    <div className={styles.extraFields}>
      <div className={styles.extraFieldsTitle}>Details</div>
      <ul className={styles.extraFieldsList}>
        {entries.map((e) => (
          <li key={e.key} className={styles.extraFieldItem}>
            <span className={styles.extraFieldKey}>{e.key}:</span>{' '}
            <span className={styles.extraFieldValue}>{e.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export function ExChiefMinistersPage() {
  const { stateSlug } = useParams();

  const state = useMemo(() => states.find((s) => s.slug === stateSlug), [stateSlug]);

  const payload = useMemo(() => {
    return (
      stateChiefMinisters?.[stateSlug] ??
      stateChiefMinisters?.[state?.slug] ??
      stateChiefMinisters?.[state?.name]
    );
  }, [stateSlug, state]);

  const exCMs = useMemo(() => {
    const list = Array.isArray(payload?.exCMs) ? payload.exCMs.slice() : [];

    // Sort: latest -> oldest.
    // We prefer `to` (end year) then `from`.
    list.sort((a, b) => {
      const toA = Number(a?.to ?? a?.end ?? a?.from ?? -Infinity);
      const toB = Number(b?.to ?? b?.end ?? b?.from ?? -Infinity);
      return toB - toA;
    });

    return list;
  }, [payload]);

  return (
    <div className={styles.page}>
      <div className={styles.container + ' container'}>
        <div className={styles.header}>
          <div className={styles.icon} aria-hidden="true">
            🏛️
          </div>
          <div>
            <h1 className={styles.h1}>Ex-Chief Ministers</h1>
            <div className={styles.sub}>
              {state ? `${state.name}` : `State: ${stateSlug}`} • Sorted latest → oldest
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {exCMs.length ? (
            exCMs.map((cm) => {
              const serving = parseServingRange(cm);
              return (
                <article key={`${cm?.name ?? 'cm'}-${serving}`} className={styles.card}>
                  <div className={styles.media}>
                    <RealTimeCMImage 
                      name={cm?.name} 
                      className={styles.photo} 
                      fallbackClassName={styles.photoFallback} 
                    />
                  </div>

                  <div className={styles.body}>
                    <div className={styles.name}>{cm?.name ?? '—'}</div>
                    {cm?.party ? <div className={styles.party}>{cm.party}</div> : null}

                    <div className={styles.period}>{serving}</div>
                    {cm?.description ? <p className={styles.desc}>{cm.description}</p> : null}

                    {renderExtraFieldsForUT(cm)}
                  </div>
                </article>

              );
            })
          ) : (
            <div className={styles.empty}>No Ex-CM data available for this state yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}


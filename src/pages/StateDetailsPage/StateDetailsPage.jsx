import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './stateDetailsPage.module.css';
import states from '../../data/states.json';
import stateChiefMinisters from '../../data/state-chief-ministers.json';
import { CMChiefCard } from '../../components/CMChiefCard/CMChiefCard.jsx';

function useLoadingOnMount() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);
  return loading;
}

export function StateDetailsPage() {
  const navigate = useNavigate();
  const { stateSlug } = useParams();
  const loading = useLoadingOnMount();

  const state = useMemo(() => {
    return states.find((s) => s.slug === stateSlug);
  }, [stateSlug]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container + ' container'}>
          <div className={styles.skeleton} />
        </div>
      </div>
    );
  }

  if (!state) {
    return (
      <div className={styles.page}>
        <div className={styles.container + ' container'}>
          <h1 className={styles.h1}>State not found</h1>
          <p className={styles.sub}>The requested state/UT does not exist in this demo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container + ' container'}>
        <div className={styles.top}>
          <div className={styles.titleRow}>
            <div className={styles.bigIcon} aria-hidden="true">
              {state.icon ?? '🏛️'}
            </div>
            <div>
              <h1 className={styles.h1}>{state.name}</h1>
              <p className={styles.sub}>
                Capital, population, area & famous places (dummy content/data).
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Capital</div>
            <div className={styles.cardValue}>{state.capital}</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Population</div>
            <div className={styles.cardValue}>{state.population}</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Area</div>
            <div className={styles.cardValue}>{state.area}</div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}>Chief Minister (CM)</div>
          <div className={styles.cmRow}>
            <CMChiefCard
              stateSlug={state.slug}
              stateName={state.name}
              currentCM={stateChiefMinisters?.[state.slug]?.currentCM}
            />

            <div className={styles.cmCard}>
              <div className={styles.cmLabel}>Cabinet Ministers</div>
              <div className={styles.ministersGrid}>
                {(() => {
                  const stateData = stateChiefMinisters?.[state.slug];
                  const cabinet = Array.isArray(stateData?.cabinet) ? stateData.cabinet : [];
                  
                  if (cabinet.length > 0) {
                    return cabinet.map((m, idx) => (
                      <div key={`${m.name}-${idx}`} className={styles.ministerItem}>
                        <div className={styles.ministerName}>{m.name}</div>
                        <div className={styles.ministerDept}>{m.ministry}</div>
                        <div className={styles.ministerMeta}>
                          <span className={styles.ministerParty} data-party={m.party}>{m.party}</span>
                          <span className={styles.ministerSince}>Since {m.termStart}</span>
                        </div>
                      </div>
                    ));
                  }

                  // Fallback/Demo data for other states
                  const dummyMinisters = [
                    { name: "Amit Kumar", dept: "Home & Finance", party: "BJP", since: "2022" },
                    { name: "Ramesh Rao", dept: "Education & Health", party: "INC", since: "2023" },
                    { name: "Suresh Reddy", dept: "Agriculture & Water", party: "TDP", since: "2024" },
                    { name: "Anjali Sharma", dept: "Social Welfare", party: "AAP", since: "2022" },
                    { name: "Priya Desai", dept: "Industries & IT", party: "NCP", since: "2023" },
                    { name: "Vijay Patil", dept: "Transport & Tourism", party: "SHS", since: "2022" },
                    { name: "Sunil Yadav", dept: "Power & Energy", party: "SP", since: "2024" },
                    { name: "Kavita Singh", dept: "Food & Civil Supplies", party: "RJD", since: "2023" }
                  ];
                  
                  return dummyMinisters.map((m, idx) => (
                    <div key={`${m.name}-${idx}`} className={styles.ministerItem}>
                      <div className={styles.ministerName}>{m.name}</div>
                      <div className={styles.ministerDept}>{m.dept}</div>
                      <div className={styles.ministerMeta}>
                        <span className={styles.ministerParty} data-party={m.party}>{m.party}</span>
                        <span className={styles.ministerSince}>Since {m.since}</span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}>Famous Tourism Spots</div>
          <div className={styles.places}>
            {(() => {
              const spots = Array.isArray(state.famousPlaces) ? state.famousPlaces : [];
              return spots.map((p, idx) => (
                <div key={`${p}-${idx}`} className={styles.placeChip}>
                  {p}
                </div>
              ));
            })()}
          </div>

          <div className={styles.spots3d} aria-hidden="true">
            <div className={styles.spot3dLayer1} />
            <div className={styles.spot3dLayer2} />
            <div className={styles.spot3dLayer3} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}>Note</div>
          <div className={styles.note}>{state.note ?? 'Dummy data for demo.'}</div>
        </div>
      </div>
    </div>
  );
}


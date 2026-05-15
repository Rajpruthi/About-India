import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './economyStateDetailsPage.module.css';
import data from '../../data/economy-india.json';

function safeLower(s) {
  return String(s ?? '').toLowerCase();
}

export function EconomyStateDetailsPage() {
  const navigate = useNavigate();
  const { stateName } = useParams();

  const state = useMemo(() => {
    const slug = decodeURIComponent(stateName ?? '');
    return (data.states ?? []).find((s) => safeLower(s.slug) === safeLower(slug) || safeLower(s.name) === safeLower(slug));
  }, [stateName]);

  if (!state) {
    return (
      <div className={styles.page}>
        <section className={styles.wrap}>
          <div className={styles.container + ' container'}>
            <div className={styles.notFound}>State not found.</div>
            <button className={styles.primaryBtn} onClick={() => navigate('/economy/india')}>
              Back to India Economy
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg} aria-hidden="true" />
        <div className={styles.container + ' container'}>
          <div className={styles.heroTop}>
            <div>
              <div className={styles.breadcrumb}>
                <button type="button" className={styles.linkBtn} onClick={() => navigate('/economy/india')}>
                  Economy of India
                </button>
                <span className={styles.sep}>/</span>
                <span className={styles.current}>{state.name}</span>
              </div>
              <h1 className={styles.h1}>Economy Details • {state.name}</h1>
              <p className={styles.lead}>Full overview of growth, industries, trade, development and future opportunities.</p>
            </div>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <div className={styles.sLabel}>State GDP</div>
                <div className={styles.sValue}>{state.stateGdp}</div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.sLabel}>Contribution</div>
                <div className={styles.sValue}>{state.contributionPercentage}</div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.sLabel}>Development Index</div>
                <div className={styles.sValue}>{state.developmentIndex}</div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.sLabel}>Crime Rate</div>
                <div className={styles.sValue}>{state.crimeRate}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container + ' container'}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Major Industries</div>
              <div className={styles.tags}>
                {state.mainIndustries?.map((i) => (
                  <span key={i} className={styles.tag}>{i}</span>
                ))}
              </div>
              <div className={styles.cardBody}>
                Historical growth indicates steady sectoral expansion with improving infrastructure and digital adoption.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Top Companies</div>
              <div className={styles.cardBody}>
                Demo list: Major conglomerates, fintech & manufacturing firms, and leading service providers.
              </div>
              <div className={styles.bullets}>
                <div>• Finance & banking leaders</div>
                <div>• Manufacturing and export champions</div>
                <div>• IT/Startups ecosystem</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Trade & Exports</div>
              <div className={styles.cardBody}>Trade growth: <b>{state.tradeGrowth}</b></div>
              <div className={styles.tags}>
                {state.exportProducts?.map((p) => (
                  <span key={p} className={styles.tagAlt}>{p}</span>
                ))}
              </div>
              <div className={styles.bullets}>
                <div>• Imports align to industrial input needs</div>
                <div>• Ports, logistics & manufacturing scale-up</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Crime & Safety Indicators</div>
              <div className={styles.cardBody}>Crime rate trend: <b>{state.crimeRate}</b> (demo).</div>
              <div className={styles.bullets}>
                <div>• Smart policing initiatives</div>
                <div>• Community programs</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Development Projects</div>
              <div className={styles.cardBody}>
                Infrastructure development focus: energy, transport corridors, logistics hubs, and urban upgrades.
              </div>
              <div className={styles.bullets}>
                <div>• Smart cities & e-governance</div>
                <div>• Industrial clusters</div>
                <div>• Renewable integration</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Agriculture & Tourism Economy</div>
              <div className={styles.splitGrid}>
                <div>
                  <div className={styles.kv}>Agriculture Contribution</div>
                  <div className={styles.kvVal}>{state.agricultureContribution}</div>
                </div>
                <div>
                  <div className={styles.kv}>Tourism Contribution</div>
                  <div className={styles.kvVal}>{state.tourismContribution}</div>
                </div>
              </div>
              <div className={styles.cardBody}>Agri and tourism value chains benefit from better connectivity and storage facilities.</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Employment & Education</div>
              <div className={styles.splitGrid}>
                <div>
                  <div className={styles.kv}>Employment Rate</div>
                  <div className={styles.kvVal}>{state.employmentRate}</div>
                </div>
                <div>
                  <div className={styles.kv}>Literacy Rate</div>
                  <div className={styles.kvVal}>{state.literacyRate}</div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Healthcare Growth</div>
              <div className={styles.cardBody}>Healthcare economy is improving through service expansion and pharma innovation.</div>
              <div className={styles.bullets}>
                <div>• Public health programs</div>
                <div>• Hospital capacity growth</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Future Opportunities</div>
              <div className={styles.cardBody}>
                Opportunities: manufacturing depth, export competitiveness, startup scaling, and renewable energy integration.
              </div>
              <div className={styles.bullets}>
                <div>• Digital economy expansion</div>
                <div>• Skill development and employment uplift</div>
                <div>• Infrastructure-led investment</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


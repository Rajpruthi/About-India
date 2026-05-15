import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './economyIndiaPage.module.css';
import data from '../../data/economy-india.json';

function safeLower(s) {
  return String(s ?? '').toLowerCase();
}

function formatIndustryLine(list) {
  if (!Array.isArray(list)) return '';
  return list.join(', ');
}

const FILTERS = [
  { key: 'gdp', label: 'GDP', matcher: (s) => s.stateGdp },
  { key: 'developmentIndex', label: 'Development', matcher: (s) => s.developmentIndex },
  { key: 'crimeRate', label: 'Crime Rate', matcher: (s) => s.crimeRate },
  { key: 'population', label: 'Population', matcher: (s) => s.population },
  { key: 'industry', label: 'Industry', matcher: (s) => s.mainIndustries },
  { key: 'agriculture', label: 'Agriculture', matcher: (s) => s.agricultureContribution },
  { key: 'it', label: 'IT', matcher: (s) => s.itContribution },
  { key: 'tourism', label: 'Tourism', matcher: (s) => s.tourismContribution }
];

export function EconomyIndiaPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('gdp');
  const [sortMode, setSortMode] = useState('top');

  const states = data.states ?? [];
  const overviewCards = data.overviewCards ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = states;
    if (q) {
      list = list.filter((s) =>
        safeLower(s.name).includes(q) ||
        safeLower(s.mainIndustries).includes(q) ||
        safeLower(s.exportProducts).includes(q) ||
        safeLower(s.majorCities).includes(q)
      );
    }

    const key = activeFilter;
    list = [...list].sort((a, b) => {
      if (key === 'industry') return safeLower(formatIndustryLine(a.mainIndustries)).localeCompare(safeLower(formatIndustryLine(b.mainIndustries)));

      const av = a?.[key];
      const bv = b?.[key];
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;

      // Heuristic numeric extraction for demo progress/sort
      const an = Number(String(av ?? '').replace(/[^0-9.]/g, ''));
      const bn = Number(String(bv ?? '').replace(/[^0-9.]/g, ''));

      if (!Number.isFinite(an) || !Number.isFinite(bn)) return 0;
      return sortMode === 'top' ? bn - an : an - bn;
    });

    return list;
  }, [activeFilter, query, sortMode, states]);

  const topStates = data.indexing?.ranking?.topPerforming ?? [];
  const fastest = data.indexing?.ranking?.fastestGrowing ?? [];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.container + ' container'}>
          <div className={styles.heroHeader}>
            <div>
              <div className={styles.kicker}>/economy/india</div>
              <h1 className={styles.h1}>Economy of India</h1>
              <p className={styles.lead}>
                India’s economy is powered by trade expansion, innovation, industry scale-up, and
                digital transformation—supported by a rapidly evolving workforce.
              </p>
            </div>

            <div className={styles.heroFacts}>
              <div className={styles.fact}>
                <div className={styles.factLabel}>GDP</div>
                <div className={styles.factValue}>{data.indiaEconomy.gdp}</div>
              </div>
              <div className={styles.fact}>
                <div className={styles.factLabel}>GDP Rank</div>
                <div className={styles.factValue}>{data.indiaEconomy.gdpRank}</div>
              </div>
              <div className={styles.fact}>
                <div className={styles.factLabel}>Inflation</div>
                <div className={styles.factValue}>{data.indiaEconomy.inflation}</div>
              </div>
              <div className={styles.fact}>
                <div className={styles.factLabel}>Growth</div>
                <div className={styles.factValue}>{data.indiaEconomy.economicGrowthRate}</div>
              </div>
            </div>
          </div>

          <div className={styles.indicatorStrip}>
            <div className={styles.indicator}>
              <div className={styles.indLabel}>Exports</div>
              <div className={styles.indValue}>{data.indiaEconomy.exports}</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indLabel}>Imports</div>
              <div className={styles.indValue}>{data.indiaEconomy.imports}</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indLabel}>Forex Reserves</div>
              <div className={styles.indValue}>{data.indiaEconomy.forexReserves}</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indLabel}>Population Contribution</div>
              <div className={styles.indValue}>{data.indiaEconomy.populationContribution}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overview}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>India Economy Overview</h2>
            <div className={styles.sectionSub}>Trade, growth, infrastructure, and sectoral contributions.</div>
          </div>

          <div className={styles.gridOverview}>
            {overviewCards.map((card) => (
              <div key={card.title} className={styles.glassCard}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    {card.icon}
                  </div>
                  <div>
                    <div className={styles.cardTitle}>{card.title}</div>
                    <div className={styles.cardDesc}>{card.description}</div>
                  </div>
                </div>

                <div className={styles.cardMetrics}>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Growth</div>
                    <div className={styles.metricValue}>{card.growthPercentage}</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Contribution</div>
                    <div className={styles.metricValue}>{card.contributionPercentage}</div>
                  </div>
                </div>

                <div className={styles.progressWrap}>
                  <div className={styles.progressTrack} aria-hidden="true">
                    <div className={styles.progressFill} style={{ width: `${card.progress ?? 60}%` }} />
                  </div>
                  <div className={styles.progressMeta}>{card.progress ?? 60}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>India Economic Statistics</h2>
            <div className={styles.sectionSub}>Hover-ready charts (demo placeholders without chart libraries yet).</div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>GDP Growth Graph</div>
              <div className={styles.spark}>
                {data.stats.gdpGrowthGraph.values.map((v, i) => (
                  <div key={data.stats.gdpGrowthGraph.labels[i]} className={styles.barWrap}>
                    <div className={styles.bar} style={{ height: `${Math.max(0, v) * 10 + 14}px` }} title={`${v}%`} />
                    <div className={styles.barLabel}>{data.stats.gdpGrowthGraph.labels[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Export-Import</div>
              <div className={styles.dualBar}>
                {data.stats.exportImport.labels.map((lab, i) => {
                  const e = data.stats.exportImport.exports[i];
                  const im = data.stats.exportImport.imports[i];
                  return (
                    <div key={lab} className={styles.dualWrap}>
                      <div className={styles.dualGroup}>
                        <div className={styles.exp} style={{ height: `${e / 8}px` }} title={`Exports ${e}`} />
                        <div className={styles.imp} style={{ height: `${im / 8}px` }} title={`Imports ${im}`} />
                      </div>
                      <div className={styles.barLabel}>{lab}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>State Contribution (Top)</div>
              <div className={styles.listBars}>
                {data.stats.stateContribution.labels.map((name, i) => {
                  const v = data.stats.stateContribution.values[i];
                  return (
                    <div key={name} className={styles.listRow}>
                      <div className={styles.listName}>{name}</div>
                      <div className={styles.listTrack}>
                        <div className={styles.listFill} style={{ width: `${v * 4}%` }} />
                      </div>
                      <div className={styles.listVal}>{v}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Population vs Economy (Demo)</div>
              <div className={styles.scatter}>
                {data.stats.populationVsEconomy.x.map((x, i) => {
                  const y = data.stats.populationVsEconomy.y[i];
                  return (
                    <div key={x} className={styles.scatterPoint} style={{ left: `${i * 33}%` }} title={`${x} / ${y} value`}>
                      <span className={styles.scatterDot} />
                      <div className={styles.scatterLabel}>{x}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Employment</div>
              <div className={styles.sparkLine}>
                {data.stats.employment.values.map((v, i) => (
                  <div key={data.stats.employment.labels[i]} className={styles.linePoint}>
                    <div className={styles.lineDot} title={`${v}M`} style={{ top: `${Math.max(0, 100 - v * 35)}%` }} />
                    <div className={styles.lineLabel}>{data.stats.employment.labels[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.states}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHeadRow}>
            <div>
              <h2 className={styles.h2}>Economy of Indian States</h2>
              <div className={styles.sectionSub}>Search, filter by indicators, and click any state for details.</div>
            </div>
            <div className={styles.rankStrip}>
              <div className={styles.rankChip}>Top Performing: {topStates.join(', ')}</div>
              <div className={styles.rankChip}>Fastest Growing: {fastest.join(', ')}</div>
            </div>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.searchRow}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search state, industry, products, cities…"
                aria-label="Search state"
              />
              <button className={styles.clearBtn} type="button" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>

            <div className={styles.filterRow}>
              <label className={styles.filterLabel}>Filter by</label>
              <select value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)} aria-label="Filter by indicator">
                {FILTERS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>

              <div className={styles.sortToggle}>
                <button
                  type="button"
                  className={sortMode === 'top' ? styles.sortActive : styles.sortBtn}
                  onClick={() => setSortMode('top')}
                >
                  Top
                </button>
                <button
                  type="button"
                  className={sortMode === 'low' ? styles.sortActive : styles.sortBtn}
                  onClick={() => setSortMode('low')}
                >
                  Low
                </button>
              </div>
            </div>
          </div>

          <div className={styles.gridStates}>
            {filtered.map((st) => (
              <div
                key={st.slug}
                className={styles.stateCard}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/economy/state/${encodeURIComponent(st.slug)}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/economy/state/${encodeURIComponent(st.slug)}`);
                  }
                }}
              >
                <div className={styles.stateHeader}>
                  <div className={styles.stateName}>{st.name}</div>
                  <div className={styles.stateBadge}>{st.developmentIndex}</div>
                </div>

                <div className={styles.stateSubGrid}>
                  <div className={styles.subItem}>
                    <div className={styles.subLabel}>State GDP</div>
                    <div className={styles.subValue}>{st.stateGdp}</div>
                  </div>
                  <div className={styles.subItem}>
                    <div className={styles.subLabel}>Contribution</div>
                    <div className={styles.subValue}>{st.contributionPercentage}</div>
                  </div>
                </div>

                <div className={styles.stateIndustries}>{formatIndustryLine(st.mainIndustries)}</div>

                <div className={styles.miniCharts}>
                  <div className={styles.miniChart}>
                    <div className={styles.miniLabel}>Agri</div>
                    <div className={styles.miniTrack}>
                      <div className={styles.miniFill} style={{ width: st.agricultureContribution?.toString().includes('%') ? st.agricultureContribution : '40%' }} />
                    </div>
                  </div>
                  <div className={styles.miniChart}>
                    <div className={styles.miniLabel}>Manufact.</div>
                    <div className={styles.miniTrack}>
                      <div className={styles.miniFill} style={{ width: st.manufacturingContribution?.toString().includes('%') ? st.manufacturingContribution : '35%' }} />
                    </div>
                  </div>
                  <div className={styles.miniChart}>
                    <div className={styles.miniLabel}>IT</div>
                    <div className={styles.miniTrack}>
                      <div className={styles.miniFill} style={{ width: st.itContribution?.toString().includes('%') ? st.itContribution : '20%' }} />
                    </div>
                  </div>
                  <div className={styles.miniChart}>
                    <div className={styles.miniLabel}>Tourism</div>
                    <div className={styles.miniTrack}>
                      <div className={styles.miniFill} style={{ width: st.tourismContribution?.toString().includes('%') ? st.tourismContribution : '12%' }} />
                    </div>
                  </div>
                </div>

                <div className={styles.stateFooter}>
                  <div className={styles.footerChip}>Trade Growth: {st.tradeGrowth}</div>
                  <div className={styles.footerChip}>Renewables: {st.renewableEnergyContribution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


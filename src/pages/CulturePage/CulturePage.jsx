import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import styles from './culturePage.module.css';
import cultureData from '../../data/culture-india.json';

const HIGHLIGHT_ICONS = {
  'Unity in Diversity': '🤝',
  'Classical Arts': '🏛️',
  Languages: '🗣️',
  Festivals: '🎉',
  Traditions: '🏺',
  Dance: '💃',
  Music: '🎶',
  Architecture: '🏛️',
  'Food Culture': '🍛',
  'Clothing Culture': '👗',
};

function useAnimatedCounter(target, durationMs = 900) {
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function CultureGlassCard({ icon, title, description, historicalImportance, modernInfluence }) {
  return (
    <div className={styles.glassCard}>
      <div className={styles.cardTop}>
        <div className={styles.cardIcon} aria-hidden="true">
          {icon}
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDesc}>{description}</p>
      <div className={styles.cardMeta}>
        <div className={styles.metaBlock}>
          <div className={styles.metaLabel}>Historical importance</div>
          <div className={styles.metaText}>{historicalImportance}</div>
        </div>
        <div className={styles.metaBlock}>
          <div className={styles.metaLabel}>Modern influence</div>
          <div className={styles.metaText}>{modernInfluence}</div>
        </div>
      </div>
    </div>
  );
}

function StateCultureCard({ state, onClick }) {
  return (
    <button type="button" className={styles.stateCard} onClick={onClick}>
      <div className={styles.stateCardBg} aria-hidden="true" />
      <div className={styles.stateCardHead}>
        <div className={styles.stateName}>{state.name}</div>
        <div className={styles.stateLang}>
          <span className={styles.statePill}>Language</span> {state.mainLanguage}
        </div>
      </div>
      <div className={styles.stateRow}>
        <div className={styles.stateItem}>
          <div className={styles.stateItemLabel}>Dress</div>
          <div className={styles.stateItemValue}>{(state.traditionalDress || []).slice(0, 2).join(' • ') || '—'}</div>
        </div>
        <div className={styles.stateItem}>
          <div className={styles.stateItemLabel}>Festivals</div>
          <div className={styles.stateItemValue}>{(state.famousFestivals || []).slice(0, 2).join(' • ') || '—'}</div>
        </div>
      </div>
      <div className={styles.stateFooter}>
        <div className={styles.stateFooterHint}>Explore culture →</div>
        <div className={styles.stateArrow} aria-hidden="true">
          ↗
        </div>
      </div>
    </button>
  );
}

function StatTile({ label, value, format = (v) => v }) {
  const displayed = useAnimatedCounter(value, 900);
  return (
    <div className={styles.statTile}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{format(displayed)}</div>
    </div>
  );
}

function TinyTimeline() {
  const items = [
    { t: 'Ancient', d: 'Rituals, temple art, early epics & grammar.' },
    { t: 'Medieval', d: 'Courts, Sufi traditions, architecture & music lineages.' },
    { t: 'Modern', d: 'Literature, cinema crossover, contemporary festivals.' },
    { t: 'Today', d: 'Digital storytelling, heritage conservation, global fusion.' },
  ];

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineHead}>
        <div className={styles.sectionKicker}>Cultural Timeline</div>
        <div className={styles.timelineTitle}>From tradition to tomorrow</div>
      </div>
      <div className={styles.timelineTrack}>
        {items.map((it, idx) => (
          <div key={it.t} className={styles.timelineItem}>
            <div className={styles.timelineDot} aria-hidden="true" />
            <div className={styles.timelineTag}>{it.t}</div>
            <div className={styles.timelineDesc}>{it.d}</div>
            {idx !== items.length - 1 && <div className={styles.timelineLine} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function FestivalCalendar({ states }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Lightweight: show a few featured festivals mapped to pseudo-month buckets.
  const featured = useMemo(() => {
    const pick = [];
    for (const s of states) {
      if ((s.famousFestivals || []).length) {
        pick.push({ state: s.name, festival: s.famousFestivals[0] });
      }
      if (pick.length >= 12) break;
    }
    return pick;
  }, [states]);

  return (
    <div className={styles.calendar}>
      <div className={styles.sectionKicker}>Festival Calendar</div>
      <div className={styles.calendarTitle}>A year of shared celebrations</div>
      <div className={styles.calendarGrid}>
        {months.map((m, i) => {
          const item = featured[i % featured.length];
          return (
            <div key={m} className={styles.monthCell}>
              <div className={styles.monthName}>{m}</div>
              <div className={styles.monthFestival}>
                {item ? (
                  <>
                    <span className={styles.monthFestivalDot} aria-hidden="true" />
                    {item.festival}
                  </>
                ) : (
                  '—'
                )}
              </div>
              {item?.state && <div className={styles.monthState}>{item.state}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CulturePage() {
  const navigate = useNavigate();
  const { indiaCulture, states } = cultureData;

  const overviewCards = indiaCulture?.overviewCards || [];

  const heroCanvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const reducedMotion = !!mq?.matches;
    if (reducedMotion) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      mouseRef.current.tx = (nx - 0.5) * 2;
      mouseRef.current.ty = (ny - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', resize);

    // Faux-3D particle field
    const count = 120;
    const particles = new Array(count).fill(0).map((_, i) => {
      const z = Math.random();
      return {
        i,
        x: (Math.random() - 0.5) * 1.6,
        y: (Math.random() - 0.5) * 1.0,
        z,
        s: 0.3 + Math.random() * 1.2,
        hue: 28 + Math.random() * 220,
      };
    });

    let t0 = performance.now();

    const draw = () => {
      const now = performance.now();
      const dt = Math.min(40, now - t0);
      t0 = now;

      // ease mouse
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      // background vignette
      const grad = ctx.createRadialGradient(w * 0.5 + m.x * 40, h * 0.25 + m.y * 25, 10, w * 0.5, h * 0.5, Math.max(w, h));
      grad.addColorStop(0, 'rgba(255, 196, 87, 0.15)');
      grad.addColorStop(0.45, 'rgba(99, 102, 241, 0.10)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // particles
      const cx = w / 2;
      const cy = h * 0.35;
      const time = now * 0.00025;

      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        // move slightly in z to simulate depth
        const z = (p.z + time * (0.12 + p.s * 0.03)) % 1;
        const depth = 0.15 + z * 0.85;

        const px = cx + p.x * w * 0.62 * depth + m.x * 50 * (1 - depth);
        const py = cy + p.y * h * 0.55 * depth + m.y * 40 * (1 - depth);

        const size = (0.9 + p.s * 1.8) * (0.25 + depth * 1.25);
        const alpha = 0.06 + depth * 0.40;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        // occasional streak
        if (idx % 7 === 0) {
          ctx.strokeStyle = `hsla(${p.hue}, 90%, 70%, ${alpha * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - (m.x * 8) * (1 - depth), py - 10 * depth);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);


  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    language: '',
    festival: '',
    dance: '',
    religion: '',
    food: '',
    art: '',
    heritage: '',
    region: '',
  });

  const filterOptions = useMemo(() => {
    // Derive unique-ish values from state list.
    const langs = new Set();
    const festivals = new Set();
    const dances = new Set();
    const religions = new Set();
    const foods = new Set();
    const arts = new Set();
    const heritages = new Set();
    const regions = new Set();

    for (const s of states) {
      if (s.mainLanguage) langs.add(s.mainLanguage);
      (s.famousFestivals || []).forEach((x) => festivals.add(x));
      (s.folkDance || []).forEach((x) => dances.add(x));
      (s.religions || []).forEach((x) => religions.add(x));
      (s.foods || []).forEach((x) => foods.add(x));
      (s.arts || []).forEach((x) => arts.add(x));
      (s.heritage || []).forEach((x) => heritages.add(x));

      // no real region in data; approximate with first word of slug/state name.
      regions.add(s.name.split(' ')[0]);
    }

    const toArray = (set) => Array.from(set).filter(Boolean).slice(0, 18);

    return {
      language: toArray(langs),
      festival: toArray(festivals),
      dance: toArray(dances),
      religion: toArray(religions),
      food: toArray(foods),
      art: toArray(arts),
      heritage: toArray(heritages),
      region: toArray(regions),
    };
  }, [states]);

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();

    return states.filter((s) => {
      const hay = [
        s.name,
        s.mainLanguage,
        ...(s.famousFestivals || []),
        ...(s.folkDance || []),
        ...(s.religions || []),
        ...(s.foods || []),
        ...(s.arts || []),
        ...(s.heritage || []),
      ]
        .filter(Boolean)
        .join(' • ')
        .toLowerCase();

      if (q && !hay.includes(q)) return false;

      const matchOne = (key, val, arrField) => {
        const v = (val || '').trim();
        if (!v) return true;
        const arr = arrField ? arrField : [];
        return arr.some((x) => String(x).toLowerCase().includes(v.toLowerCase()));
      };

      if (filters.language) {
        if (!String(s.mainLanguage || '').toLowerCase().includes(filters.language.toLowerCase())) return false;
      }
      if (filters.festival) {
        if (!matchOne('festival', filters.festival, s.famousFestivals || [])) return false;
      }
      if (filters.dance) {
        if (!matchOne('dance', filters.dance, s.folkDance || [])) return false;
      }
      if (filters.religion) {
        if (!matchOne('religion', filters.religion, s.religions || [])) return false;
      }
      if (filters.food) {
        if (!matchOne('food', filters.food, s.foods || [])) return false;
      }
      if (filters.art) {
        if (!matchOne('art', filters.art, s.arts || [])) return false;
      }
      if (filters.heritage) {
        if (!matchOne('heritage', filters.heritage, s.heritage || [])) return false;
      }
      if (filters.region) {
        const approxRegion = s.name.split(' ')[0];
        if (!approxRegion.toLowerCase().includes(filters.region.toLowerCase())) return false;
      }

      return true;
    });
  }, [states, query, filters]);

  const highlights = indiaCulture?.highlights || [];

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <canvas ref={heroCanvasRef} className={styles.heroCanvas} aria-hidden="true" />
        <div className={styles.container + ' container'}>

          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <div className={styles.sectionKicker}>Cultural Heritage • Living Traditions</div>
              <h1 className={styles.h1}>{indiaCulture?.hero?.title || 'Culture of India'}</h1>
              <p className={styles.sub}>
                {indiaCulture?.hero?.subtitle ||
                  'India’s diversity is a living mosaic—heritage, traditions, classical arts, languages, festivals, music, dance, architecture, and a rich culinary world.'}
              </p>

              <div className={styles.highlightWrap}>
                {highlights.map((h) => (
                  <div key={h} className={styles.highlight}>
                    <div className={styles.highlightIcon} aria-hidden="true">
                      {HIGHLIGHT_ICONS[h] || '✨'}
                    </div>
                    <div className={styles.highlightText}>{h}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heroArt}>
              <div className={styles.artFrame}>
                <div className={styles.artRing} aria-hidden="true" />
                <div className={styles.artStamp}>
                  <div className={styles.stampTop}>भारत</div>
                  <div className={styles.stampMid}>INDIA</div>
                  <div className={styles.stampBottom}>Culture Atlas</div>
                </div>
                <div className={styles.artPattern} aria-hidden="true" />
              </div>
              <div className={styles.heroQuick}>
                <div className={styles.quickItem}>
                  <div className={styles.quickLabel}>Explore</div>
                  <div className={styles.quickValue}>States & Traditions</div>
                </div>
                <div className={styles.quickItem}>
                  <div className={styles.quickLabel}>Learn</div>
                  <div className={styles.quickValue}>Arts • Dance • Food</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW CARDS */}
      <section className={styles.section}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionKicker}>India Culture Overview</div>
              <h2 className={styles.h2}>Threads that bind a nation</h2>
            </div>
            <div className={styles.sectionSub}>
              Animated glass cards—each theme connects history, identity, and modern creativity.
            </div>
          </div>

          <div className={styles.grid3}>
            {overviewCards.map((c) => (
              <div key={c.id} className={styles.motionWrap}>
                <CultureGlassCard
                  icon={c.icon}
                  title={c.title}
                  description={c.description}
                  historicalImportance={c.historicalImportance}
                  modernInfluence={c.modernInfluence}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className={styles.sectionAlt}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionKicker}>Cultural Statistics</div>
              <h2 className={styles.h2}>Numbers with meaning</h2>
            </div>
            <div className={styles.sectionSub}>Animated counters and a compact cultural index view.</div>
          </div>

          <div className={styles.statsGrid}>
            <StatTile label="Languages" value={indiaCulture?.stats?.numberOfLanguages || 780} format={(v) => `${v}+`} />
            <StatTile label="UNESCO Heritage Sites" value={indiaCulture?.stats?.unescoHeritageSites || 43} format={(v) => `${v}`} />
            <StatTile label="Major Religions" value={indiaCulture?.stats?.majorReligions || 6} format={(v) => `${v}`} />
            <StatTile
              label="Classical Dance Forms"
              value={indiaCulture?.stats?.classicalDanceForms || 8}
              format={(v) => `${v}`}
            />
            <StatTile label="Cultural Diversity Index" value={indiaCulture?.stats?.culturalDiversityIndex || 92} format={(v) => `${v}%`} />
            <StatTile label="Festivals" value={indiaCulture?.stats?.festivalCount || 1000} format={(v) => `${v}+`} />
            <StatTile label="Traditional Art Forms" value={indiaCulture?.stats?.traditionalArtForms || 1200} format={(v) => `${v}+`} />
          </div>

          <div className={styles.statsVizRow}>
            <div className={styles.vizCard}>
              <div className={styles.vizTitle}>Cultural Index (visual)</div>
              <div className={styles.vizSub}>A premium, lightweight gauge—no extra libraries.</div>
              <div className={styles.gaugeWrap}>
                <div className={styles.gauge}>
                  <div className={styles.gaugeGlow} />
                  <div className={styles.gaugeNeedle} style={{ transform: `rotate(${(indiaCulture?.stats?.culturalDiversityIndex || 92) * 1.8}deg)` }} />
                  <div className={styles.gaugeCenter}>
                    <div className={styles.gaugeCenterValue}>{indiaCulture?.stats?.culturalDiversityIndex || 92}%</div>
                    <div className={styles.gaugeCenterLabel}>Diversity Index</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.vizCard}>
              <div className={styles.vizTitle}>Festival density (timeline)</div>
              <div className={styles.vizSub}>Approximate distribution to inspire exploration.</div>
              <div className={styles.bars}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const base = (indiaCulture?.stats?.festivalCount || 1000) / 12;
                  const factor = 0.6 + (i % 5) * 0.12;
                  const height = Math.min(100, Math.round((base * factor) / ((indiaCulture?.stats?.festivalCount || 1000) / 100)));
                  return (
                    <div key={i} className={styles.barWrap}>
                      <div className={styles.bar} style={{ height: `${height}%` }} />
                    </div>
                  );
                })}
              </div>
              <div className={styles.barsFooter}>Jan → Dec</div>
            </div>
          </div>

          <div className={styles.twoCol}>
            <TinyTimeline />
            <FestivalCalendar states={states} />
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className={styles.section}>
        <div className={styles.container + ' container'}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.sectionKicker}>Culture of Indian States</div>
              <h2 className={styles.h2}>Explore state-wise heritage</h2>
            </div>
            <div className={styles.sectionSub}>Search, filter, then open a state for a full cultural dossier.</div>
          </div>

          <div className={styles.filterPanel}>
            <div className={styles.searchRow}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by language, festival, dance, food, heritage…"
                aria-label="Search states by culture"
                className={styles.searchInput}
              />
            </div>

            {/* Minimal compact filters to satisfy UI + search requirements */}
            <div className={styles.filtersRow}>
              <select
                className={styles.filterSelect}
                value={filters.language}
                onChange={(e) => setFilters((p) => ({ ...p, language: e.target.value }))}
                aria-label="Filter by language"
              >
                <option value="">Language</option>
                {filterOptions.language.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.festival}
                onChange={(e) => setFilters((p) => ({ ...p, festival: e.target.value }))}
                aria-label="Filter by festival"
              >
                <option value="">Festival</option>
                {filterOptions.festival.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.dance}
                onChange={(e) => setFilters((p) => ({ ...p, dance: e.target.value }))}
                aria-label="Filter by dance"
              >
                <option value="">Dance</option>
                {filterOptions.dance.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.religion}
                onChange={(e) => setFilters((p) => ({ ...p, religion: e.target.value }))}
                aria-label="Filter by religion"
              >
                <option value="">Religion</option>
                {filterOptions.religion.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.food}
                onChange={(e) => setFilters((p) => ({ ...p, food: e.target.value }))}
                aria-label="Filter by food"
              >
                <option value="">Food</option>
                {filterOptions.food.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.heritage}
                onChange={(e) => setFilters((p) => ({ ...p, heritage: e.target.value }))}
                aria-label="Filter by heritage"
              >
                <option value="">Heritage</option>
                {filterOptions.heritage.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.art}
                onChange={(e) => setFilters((p) => ({ ...p, art: e.target.value }))}
                aria-label="Filter by art"
              >
                <option value="">Art</option>
                {filterOptions.art.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filters.region}
                onChange={(e) => setFilters((p) => ({ ...p, region: e.target.value }))}
                aria-label="Filter by region"
              >
                <option value="">Region</option>
                {filterOptions.region.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className={styles.clearBtn}
                onClick={() =>
                  setFilters({
                    language: '',
                    festival: '',
                    dance: '',
                    religion: '',
                    food: '',
                    art: '',
                    heritage: '',
                    region: '',
                  })
                }
              >
                Clear
              </button>
            </div>

            <div className={styles.resultsHead}>
              <div className={styles.resultsTitle}>States matching your culture explorer</div>
              <div className={styles.resultsCount}>{filteredStates.length} results</div>
            </div>

            <div className={styles.statesGrid}>
              {filteredStates.map((s) => (
                <StateCultureCard
                  key={s.slug}
                  state={s}
                  onClick={() => navigate(`/culture/state/${s.slug}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.bottomSpace} />
    </div>
  );
}


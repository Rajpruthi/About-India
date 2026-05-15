import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './cultureStateDetailsPage.module.css';
import cultureData from '../../data/culture-india.json';

function Section({ title, children, icon }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionIcon} aria-hidden="true">
          {icon}
        </div>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function ListChips({ items }) {
  if (!items?.length) return <div className={styles.muted}>—</div>;
  return (
    <div className={styles.chips}>
      {items.map((x) => (
        <span key={String(x)} className={styles.chip}>
          {x}
        </span>
      ))}
    </div>
  );
}

function TextOrDash({ text }) {
  return text ? <>{text}</> : <span className={styles.muted}>—</span>;
}

export function CultureStateDetailsPage() {
  const { stateSlug } = useParams();
  const navigate = useNavigate();

  const { states } = cultureData;

  const state = useMemo(() => {
    if (!stateSlug) return null;
    return states.find((s) => s.slug === stateSlug || s.name === stateSlug) || null;
  }, [stateSlug, states]);

  const normalized = state
    ? {
        name: state.name,
        mainLanguage: state.mainLanguage,
        traditionalDress: state.traditionalDress || [],
        famousFestivals: state.famousFestivals || [],
        folkDance: state.folkDance || [],
        musicStyle: state.musicStyle || [],
        foods: state.foods || [],
        arts: state.arts || [],
        heritage: state.heritage || [],
        religiousCulture: state.religiousCulture || [],
        tribalCulture: state.tribalCulture || [],
        traditionalArchitecture: state.traditionalArchitecture || [],
        literature: state.literature || [],
        tourismCulture: state.tourismCulture || [],
        famousCulturalPlaces: state.famousCulturalPlaces || [],
        modernInfluence: state.modernInfluence || [],
        religions: state.religions || [],
      }
    : null;

  if (!normalized) {
    return (
      <div className={styles.page}>
        <div className={styles.container + ' container'}>
          <div className={styles.breadcrumbs}>
            <button type="button" className={styles.backBtn} onClick={() => navigate('/culture')}>
              ← Back to Culture
            </button>
          </div>

          <div className={styles.notFound}>
            <div className={styles.notFoundTitle}>State not found</div>
            <div className={styles.notFoundSub}>The requested culture dossier could not be loaded.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.container + ' container'}>
        <div className={styles.breadcrumbs}>
          <button type="button" className={styles.backBtn} onClick={() => navigate('/culture')}>
            ← Back to Culture
          </button>
          <div className={styles.breadcrumbSep}>/</div>
          <div className={styles.crumb}>Culture of Indian States</div>
        </div>

        <header className={styles.hero}>
          <div className={styles.heroTitleBlock}>
            <div className={styles.kicker}>Culture dossier</div>
            <h1 className={styles.h1}>{normalized.name}</h1>
            <p className={styles.sub}>
              Explore languages, festivals, traditional arts, food, architecture and living heritage.
            </p>
          </div>

          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Main language</div>
              <div className={styles.metaValue}>{normalized.mainLanguage}</div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Key festivals</div>
              <div className={styles.metaValue}>
                {normalized.famousFestivals.slice(0, 2).join(' • ') || '—'}
              </div>
            </div>
          </div>
        </header>

        <div className={styles.grid}>
          <div className={styles.left}>
            <Section icon="🎭" title="Traditional arts">
              <ListChips items={normalized.arts} />
            </Section>

            <Section icon="🎉" title="Major festivals">
              <ListChips items={normalized.famousFestivals} />
            </Section>

            <Section icon="🗣️" title="Languages spoken">
              <TextOrDash text={normalized.mainLanguage} />
              {normalized.religions?.length ? (
                <div className={styles.smallNote}>Religions in culture: {normalized.religions.join(' • ')}</div>
              ) : null}
            </Section>

            <Section icon="⛪" title="Religious traditions">
              <ListChips items={normalized.religiousCulture} />
            </Section>

            <Section icon="👗" title="Traditional clothing">
              <ListChips items={normalized.traditionalDress} />
            </Section>

            <Section icon="🍲" title="Food culture">
              <ListChips items={normalized.foods} />
            </Section>

            <Section icon="🎵" title="Music and dance">
              <div className={styles.twoCol}>
                <div>
                  <div className={styles.mutedLabel}>Music style</div>
                  <ListChips items={normalized.musicStyle} />
                </div>
                <div>
                  <div className={styles.mutedLabel}>Folk dance</div>
                  <ListChips items={normalized.folkDance} />
                </div>
              </div>
            </Section>

            <Section icon="🏛️" title="Historical monuments & architecture">
              <ListChips items={normalized.heritage} />
              <div className={styles.spacer} />
              <ListChips items={normalized.traditionalArchitecture} />
            </Section>
          </div>

          <aside className={styles.right}>
            <Section icon="🧕" title="Tribal communities">
              <ListChips items={normalized.tribalCulture} />
            </Section>

            <Section icon="📚" title="Literature & poetry">
              <ListChips items={normalized.literature} />
            </Section>

            <Section icon="📍" title="Tourism attractions & heritage places">
              <ListChips items={normalized.tourismCulture} />
              <div className={styles.spacer} />
              <ListChips items={normalized.famousCulturalPlaces} />
            </Section>

            <Section icon="🪄" title="Modern cultural influence">
              <ListChips items={normalized.modernInfluence} />
            </Section>

            <div className={styles.tip}>
              Tip: Use the <b>Culture</b> search & filters to quickly discover states by festival, dance, food, heritage and religion.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


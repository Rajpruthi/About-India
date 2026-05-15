import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './historyErasPage.module.css';

const ERAS = [
  {
    id: 'ancient-india',
    label: 'Ancient India',
    subtitle: 'Culture, knowledge, trade, and innovation.',
    title: 'Ancient India',
    bullets: ["Ancient India developed one of the world’s richest civilizations, with major contributions in culture, knowledge, trade, and innovation.",

"Ancient Indian culture was deeply influenced by religion, philosophy, and social values. Traditions from the Hinduism, Buddhism, and Jainism shaped daily life.",
"The concept of dharma (duty) guided society. Art, music, dance, and architecture flourished, as seen in temples, sculptures, and paintings like those at Ajanta and Ellora. Literature such as the Vedas, Ramayana, and Mahabharata played a key role in preserving cultural values.",

"📚 Knowledge :",

"Ancient India made significant advances in education and learning. Renowned universities like Nalanda University attracted students from across the world.",
"Scholars contributed to mathematics, astronomy, medicine, and philosophy. The concept of zero and the decimal system were developed by Indian mathematicians. Texts like the Ayurveda laid the foundation for traditional medicine, while astronomy texts explained planetary movements.",

"🚢 Trade:",

"Trade was highly developed in ancient India. The civilization of the Indus Valley Civilization had well-planned cities and trade links with Mesopotamia.",
"Later, during the Maurya and Gupta periods, both internal and external trade expanded. India exported spices, textiles, precious stones, and metals, while importing goods from Central Asia and the Roman Empire. Trade routes such as land routes and sea routes connected India with other parts of the world.",

"⚙️ Innovation:",

"Ancient India was a center of innovation in many fields. In science and technology, Indians developed advanced metallurgy, including high-quality steel (like Wootz steel).",
"In medicine, surgical techniques were described by Sushruta. In mathematics, Aryabhata made important contributions to algebra and astronomy. Urban planning in the Indus Valley Civilization showed advanced knowledge of drainage systems and city design.",

"✅ Conclusion:",

"Thus, ancient India was a highly advanced civilization with strong cultural traditions, deep knowledge systems, flourishing trade networks, and remarkable innovations that influenced the world for centuries."],
  },
  {
    id: 'medieval-renaissance',
    label: 'Medieval & Renaissance',
    subtitle: 'Architecture, literature, and diverse traditions.',
    title: 'Medieval & Renaissance',
    bullets: ["The “medieval–renaissance” phase in Indian history (roughly 1200–1700 CE) saw a rich blending of traditions, especially under the Delhi Sultanate and the Mughal Empire.",

"🏛️ Architecture :",

"Architecture in this period reflects a fusion of Indian and Islamic styles. The Indo-Islamic style introduced arches, domes, minarets, and large courtyards.",
"Famous structures include the Qutub Minar, Red Fort, and the Taj Mahal.",
"Mughal architecture is known for symmetry, gardens (charbagh), marble work, and intricate decoration, showing a high level of artistic and engineering skill.",

"📚 Literature :",

"Literature flourished in multiple languages such as Persian, Sanskrit, and regional languages like Hindi, Bengali, and Tamil.",
"Persian became the court language under the Mughals. Writers like Abul Fazl documented history in works like the Akbarnama.",
"At the same time, the Bhakti movement and Sufi traditions encouraged literature in local languages. Saints like Kabir and Tulsidas wrote devotional poetry that emphasized love, unity, and devotion to God.",

"🌍 Diverse Traditions :",

"This period was marked by cultural interaction and diversity. The Bhakti movement and Sufism promoted spiritual equality, tolerance, and unity among different communities.",
"Religious and cultural blending led to new traditions in music, art, clothing, and food. Festivals and customs from different communities began to influence each other, creating a composite culture.",

"✅ Conclusion :",

"Thus, the medieval–renaissance period in India was a time of cultural synthesis, marked by magnificent architecture, rich literary traditions, and diverse social and religious practices that shaped India’s heritage."],
  },
  {
    id: 'independence-movement',
    label: 'Independence Movement',
    subtitle: 'Non-violence, revolutions, and determination.',
    title: 'Independence Movement',
    bullets: ["India’s independence movement (late 19th century–1947) was shaped by three powerful forces—non-violence, revolutionary action, and unwavering determination.",

"✊ Non-Violence (Ahimsa):",
"The principle of non-violence became the core strategy of the freedom struggle under Mahatma Gandhi.",
"Gandhi introduced Satyagraha (truth-force), encouraging peaceful resistance against British rule. Movements like the Non-Cooperation Movement, Civil Disobedience Movement, and Quit India Movement mobilized millions of Indians without using violence.",
"This approach united people across religions and regions and gained international support for India’s cause.",

"💣 Revolutionary Activities :",
"Alongside non-violence, many revolutionaries believed in armed struggle to end British rule. Leaders like Bhagat Singh, Subhas Chandra Bose, and Chandrashekhar Azad inspired youth to fight for freedom.",
"Organizations like the Indian National Army (INA), led by Bose, attempted to overthrow British rule through military action.",
"These revolutionary efforts created fear among the British and added pressure for independence.",

"🔥 Determination and Unity :",
"The most important strength of the independence movement was the determination of the Indian people. Millions participated in protests, strikes, and boycotts despite facing imprisonment, violence, and hardship.",
"Leaders and common people showed great courage and unity, keeping the movement alive for decades.",

"📜 Key Event :",
"The continuous struggle finally led to India’s independence in 1947, marked by the Indian Independence.",

"✅ Conclusion :",
"Thus, India’s freedom struggle was a unique combination of non-violent resistance, revolutionary actions, and strong determination, which together led to the end of British rule and the birth of an independent nation."],
  },
  {
    id: 'modern-india',
    label: 'Modern India',
    subtitle: 'Democracy, development, and unity.',
    title: 'Modern India',
    bullets: ["Modern India, after independence in 1947, has grown as a strong nation built on democracy, development, and unity.",

"🗳️ Democracy :",
"India adopted a democratic system with the enforcement of the Constitution of India in 1950.",
"It is the world’s largest democracy, where people elect their representatives through free and fair elections.",
"Institutions like Parliament, the judiciary, and an independent election system ensure that citizens have rights such as equality, freedom, and justice.",

"📈 Development :",
"Since independence, India has made significant progress in various fields.",
"In agriculture, the Green Revolution increased food production and made the country self-sufficient.",
"In industry, science, and technology, India has advanced rapidly, becoming a leader in space research, information technology, and infrastructure development.",
"Economic reforms in 1991 also helped boost growth and global integration.",

"🤝 Unity in Diversity :",
"India is known for its unity despite vast diversity in language, religion, culture, and traditions.",
"The principle of “unity in diversity” binds the country together. Festivals, customs, and traditions from different communities are respected and celebrated across the nation.",
"National integration has been strengthened through shared values, constitutional rights, and a sense of belonging among citizens.",

"📜 Key Event :",
"India became a sovereign democratic republic on Republic Day (26 January 1950), marking the beginning of its modern democratic journey.",

"✅ Conclusion :",
"Thus, modern India stands as a democratic nation progressing in development while maintaining unity among its diverse population, making it a strong and vibrant country."],
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

export function HistoryErasPage() {
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  const [activeId, setActiveId] = useState(ERAS[0].id);
  const active = useMemo(() => ERAS.find((e) => e.id === activeId) ?? ERAS[0], [activeId]);

  // 3D-ish interactive card rotation by mouse position.
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    setTilt({ rx: 0, ry: 0 });
  }, [activeId, reducedMotion]);

  return (
    <div className={styles.page}>
      <div className={styles.container + ' container'}>
        <header className={styles.hero}>
          <div>
            <div className={styles.kicker}>Click any era</div>
            <h1 className={styles.h1}>Journey Through Indian History</h1>
            <p className={styles.lead}>
              Four eras. Four themes. One interactive 3D experience.
            </p>
          </div>

          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/')}
            aria-label="Back to Home"
          >
            ← Home
          </button>
        </header>

        <section className={styles.grid}>
          <div className={styles.listWrap}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionTitle}>Eras</div>
              <div className={styles.sectionSub}>Select one to open its full section.</div>
            </div>

            <div className={styles.eraList} role="list">
              {ERAS.map((e) => {
                const isActive = e.id === activeId;
                return (
                  <button
                    key={e.id}
                    type="button"
                    className={[styles.eraBtn, isActive ? styles.eraBtnActive : ''].join(' ')}
                    onClick={() => setActiveId(e.id)}
                    role="listitem"
                    aria-pressed={isActive}
                  >
                    <span className={styles.eraLabel}>{e.label}</span>
                    <span className={styles.eraArrow} aria-hidden="true">
                      {isActive ? '↘' : '→'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.detailWrap}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionTitle}>What you’ll learn</div>
              <div className={styles.sectionSub}>Now showing: {active.label}</div>
            </div>

            <div
              className={styles.card3d}
              onMouseMove={(ev) => {
                if (reducedMotion) return;
                const rect = ev.currentTarget.getBoundingClientRect();
                const px = (ev.clientX - rect.left) / rect.width;
                const py = (ev.clientY - rect.top) / rect.height;
                const ry = (px - 0.5) * 16;
                const rx = -(py - 0.5) * 16;
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
              <div className={styles.cardGlow} aria-hidden="true" />

              <div className={styles.cardTop}>
                <div className={styles.badge3d}>
                  <span className={styles.badgeText}>{active.label}</span>
                </div>
                <div className={styles.cardSubtitle}>{active.subtitle}</div>
              </div>

              <div className={styles.cardContent}>
                <h2 className={styles.h2}>{active.title}</h2>
                <ul className={styles.bullets}>
                  {active.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.progress} aria-label="Era selection progress">
                  {ERAS.map((e) => {
                    const on = e.id === activeId;
                    return (
                      <span
                        key={e.id}
                        className={[styles.dot, on ? styles.dotOn : ''].join(' ')}
                        onClick={() => setActiveId(e.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Show ${e.label}`}
                      />
                    );
                  })}
                </div>

                <div className={styles.note}>
                  Tip: hover the panel for 3D motion (respects “reduced motion”).
                </div>
              </div>

              <div className={styles.layers} aria-hidden="true">
                <div className={styles.layerA} />
                <div className={styles.layerB} />
                <div className={styles.layerC} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


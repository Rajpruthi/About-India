import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import styles from "./tourismPage.module.css";

const IMG = [
  "https://loremflickr.com/1400/900/india,monument?lock=10",
  "https://loremflickr.com/1400/900/india,nature?lock=11",
  "https://loremflickr.com/1400/900/india,culture?lock=12",
  "https://loremflickr.com/1400/900/india,temple?lock=13",
  "https://loremflickr.com/1400/900/india,landscape?lock=14",
];

const DEFAULT_GALLERY = [
  ...IMG,
  "https://loremflickr.com/1400/900/india,people?lock=15",
  "https://loremflickr.com/1400/900/india,street?lock=16",
  "https://loremflickr.com/1400/900/india,mountain?lock=17",
  "https://loremflickr.com/1400/900/india,beach?lock=18",
];

const TOURISM_TYPES = [
  "Beach",
  "Historical",
  "Religious",
  "Nature",
  "Adventure",
  "Wildlife",
  "Hill Station",
  "Cultural",
];

const TOURISM_SPOTS = [
  {
    name: "Taj Mahal",
    state: "Uttar Pradesh",
    location: "Agra",
    types: ["Historical", "Cultural", "Religious"],
    whyFamous: "Majestic marble mausoleum built by Mughal emperor Shah Jahan.",
    historicalImportance: "Symbol of Mughal architecture and UNESCO heritage.",
    bestTime: "Oct–Mar",
    popularFoods: ["Petha", "Agra kebabs", "Parathas"],
    nearbyAttractions: ["Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"],
    culturalImportance: "Heritage walks, poetry and night bazaars in Agra.",
    travelTips: "Arrive early; carry light shawl for evenings.",
    rating: 4.8,
    shortDescription:
      "A breathtaking monument of beauty, craftsmanship, and history.",
    entryFee: "INR 50–105",
    gallery: [
      "https://loremflickr.com/1400/900/tajmahal?lock=1",
      "https://loremflickr.com/1400/900/tajmahal?lock=2",
      "https://loremflickr.com/1400/900/tajmahal?lock=3",
      "https://loremflickr.com/1400/900/tajmahal?lock=4",
      "https://loremflickr.com/1400/900/tajmahal?lock=5",
    ],
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    location: "Pink City",
    types: ["Historical", "Cultural"],
    whyFamous: "Havelis, forts and vibrant markets—glamorous Rajasthan.",
    historicalImportance:
      "Capital of the Jaipur kingdom; architectural marvels.",
    bestTime: "Oct–Mar",
    popularFoods: ["Dal Baati Churma", "Gatte ki Sabzi", "Pyaaz Kachori"],
    nearbyAttractions: ["Amber Fort", "Hawa Mahal", "Jal Mahal"],
    culturalImportance: "Folk music, crafts and desert festivals.",
    travelTips: "Start early for forts; explore bazaars at dusk.",
    rating: 4.7,
    shortDescription: "Royal palaces, colorful streets, and timeless craft.",
    entryFee: "Varies by attraction",
    gallery: [
      "https://loremflickr.com/1400/900/jaipur,palace?lock=1",
      "https://loremflickr.com/1400/900/jaipur,fort?lock=2",
      "https://loremflickr.com/1400/900/jaipur,city?lock=3",
      "https://loremflickr.com/1400/900/jaipur,architecture?lock=4",
      "https://loremflickr.com/1400/900/jaipur,monument?lock=5",
    ],
  },
  {
    name: "Goa Beaches",
    state: "Goa",
    location: "Arabian Sea",
    types: ["Beach", "Cultural", "Nature"],
    whyFamous: "Sun-kissed beaches, Portuguese heritage and nightlife.",
    historicalImportance: "A fusion of Portuguese and Indian traditions.",
    bestTime: "Nov–Feb",
    popularFoods: ["Fish curry rice", "Vindaloo", "Pao bread"],
    nearbyAttractions: ["Old Goa", "Fort Aguada", "Dudhsagar (nearby)"],
    culturalImportance: "Church festivals, fado nights and local shacks.",
    travelTips: "Carry sunscreen; visit beaches at sunrise for calmer vibes.",
    rating: 4.6,
    shortDescription:
      "Coastal charm, heritage vibes and unforgettable sunsets.",
    entryFee: "Free (beaches)",
    gallery: [
      "https://loremflickr.com/1400/900/goa,beach?lock=1",
      "https://loremflickr.com/1400/900/goa,ocean?lock=2",
      "https://loremflickr.com/1400/900/goa,sunset?lock=3",
      "https://loremflickr.com/1400/900/goa,sand?lock=4",
      "https://loremflickr.com/1400/900/goa,coast?lock=5",
    ],
  },
  {
    name: "Kerala Backwaters",
    state: "Kerala",
    location: "Alappuzha & Kollam",
    types: ["Nature", "Cultural"],
    whyFamous: "Serene houseboat journeys through lagoons and canals.",
    historicalImportance: "Trade routes and temple-canal culture.",
    bestTime: "Sep–Mar",
    popularFoods: ["Appam", "Karimeen", "Puttu & stew"],
    nearbyAttractions: ["Alappuzha", "Kumarakom", "Alleppey canals"],
    culturalImportance: "Traditional boat races and local arts.",
    travelTips: "Pick a morning cruise for golden reflections.",
    rating: 4.7,
    shortDescription: "A tranquil watery world with warm hospitality.",
    entryFee: "Varies by cruise",
    gallery: [
      "https://loremflickr.com/1400/900/kerala,backwaters?lock=1",
      "https://loremflickr.com/1400/900/kerala,houseboat?lock=2",
      "https://loremflickr.com/1400/900/kerala,river?lock=3",
      "https://loremflickr.com/1400/900/kerala,nature?lock=4",
      "https://loremflickr.com/1400/900/kerala,water?lock=5",
    ],
  },
  {
    name: "Ladakh",
    state: "Ladakh",
    location: "Himalayan region",
    types: ["Adventure", "Nature", "Historical", "Religious"],
    whyFamous: "Breathtaking high-altitude landscapes and monasteries.",
    historicalImportance: "A key Silk Route corridor between cultures.",
    bestTime: "May–Sep",
    popularFoods: ["Thukpa", "Momos", "Skyu (local soup)"],
    nearbyAttractions: ["Pangong Lake", "Leh Palace", "Nubra Valley"],
    culturalImportance: "Buddhist festivals and mountain monasteries.",
    travelTips: "Acclimatize well; pack warm layers.",
    rating: 4.8,
    shortDescription: "Dreamlike peaks, clear lakes and ancient monasteries.",
    entryFee: "Varies by area",
    gallery: [
      "https://loremflickr.com/1400/900/ladakh,mountain?lock=1",
      "https://loremflickr.com/1400/900/ladakh,lake?lock=2",
      "https://loremflickr.com/1400/900/ladakh,monastery?lock=3",
      "https://loremflickr.com/1400/900/ladakh,valley?lock=4",
      "https://loremflickr.com/1400/900/ladakh,landscape?lock=5",
    ],
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    location: "Ganges river",
    types: ["Religious", "Cultural", "Historical"],
    whyFamous: "Ghats, evening aartis, and timeless spiritual life.",
    historicalImportance: "One of the world’s oldest living cities.",
    bestTime: "Nov–Mar",
    popularFoods: ["Malaiyyo", "Kachori", "Jalebi"],
    nearbyAttractions: ["Sarnath", "Assi Ghat", "Ramnagar Fort"],
    culturalImportance: "Classical music, rituals and heritage workshops.",
    travelTips: "Experience sunrise boat ride; keep evenings respectful.",
    rating: 4.7,
    shortDescription: "A spiritual journey along the river of life.",
    entryFee: "Varies by temples",
    gallery: [
      "https://loremflickr.com/1400/900/varanasi,ghat?lock=1",
      "https://loremflickr.com/1400/900/varanasi,river?lock=2",
      "https://loremflickr.com/1400/900/varanasi,temple?lock=3",
      "https://loremflickr.com/1400/900/varanasi,boat?lock=4",
      "https://loremflickr.com/1400/900/varanasi,ganga?lock=5",
    ],
  },
  {
    name: "Darjeeling",
    state: "West Bengal",
    location: "Queen of Hill Stations",
    types: ["Hill Station", "Nature", "Cultural"],
    whyFamous: "Tea gardens, misty views, and heritage toy trains.",
    historicalImportance: "Colonial hill-station legacy; UNESCO tea legacy.",
    bestTime: "Mar–May & Sep–Nov",
    popularFoods: ["Momos", "Thukpa", "Chowmein"],
    nearbyAttractions: ["Tiger Hill", "Batasia Loop", "Ghoom Monastery"],
    culturalImportance: "Ethnic communities and Himalayan culture.",
    travelTips: "Carry a light rain jacket for quick fog/mist changes.",
    rating: 4.6,
    shortDescription: "Cloud-kissed hills with iconic tea culture.",
    entryFee: "Varies by attractions",
    gallery: [
      "https://loremflickr.com/1400/900/darjeeling,tea?lock=1",
      "https://loremflickr.com/1400/900/darjeeling,hill?lock=2",
      "https://loremflickr.com/1400/900/darjeeling,mountain?lock=3",
      "https://loremflickr.com/1400/900/darjeeling,train?lock=4",
      "https://loremflickr.com/1400/900/darjeeling,nature?lock=5",
    ],
  },
  {
    name: "Sundarbans",
    state: "West Bengal",
    location: "Bengal Delta",
    types: ["Wildlife", "Nature", "Adventure"],
    whyFamous: "Mangrove ecosystems and the elusive Bengal tiger.",
    historicalImportance: "Unique delta geography and ecological importance.",
    bestTime: "Oct–Mar",
    popularFoods: ["Mustard fish", "Rice & dal", "Seafood thali"],
    nearbyAttractions: ["Sajnekhali", "Watchtowers", "Kochikhali"],
    culturalImportance: "Fisher folk heritage and forest traditions.",
    travelTips: "Go with a licensed guide; carry water and rain gear.",
    rating: 4.5,
    shortDescription:
      "Wild wetlands, mangroves and extraordinary biodiversity.",
    entryFee: "Varies by permit",
    gallery: [
      "https://loremflickr.com/1400/900/sundarbans,tiger?lock=1",
      "https://loremflickr.com/1400/900/sundarbans,forest?lock=2",
      "https://loremflickr.com/1400/900/sundarbans,river?lock=3",
      "https://loremflickr.com/1400/900/sundarbans,mangrove?lock=4",
      "https://loremflickr.com/1400/900/sundarbans,wildlife?lock=5",
    ],
  },
];

const ALL_STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
  "Sikkim",
];

// Ensure uniqueness
const STATES = Array.from(new Set(ALL_STATES_AND_UTS));

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useIntersectionOnce() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

function ScrollReveal({ children }) {
  const { ref, shown } = useIntersectionOnce();
  return (
    <div ref={ref} className={shown ? styles.revealShown : styles.revealWrap}>
      {children}
    </div>
  );
}

function StarBar({ rating }) {
  const pct = clamp((rating / 5) * 100, 0, 100);
  return (
    <div className={styles.starTrack} aria-label={`Rating ${rating} out of 5`}>
      <div className={styles.starFill} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Lightbox({ open, images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, images.length, onClose]);

  if (!open) return null;
  const current = images[index];

  return (
    <motion.div
      className={styles.lightboxOverlay}
      initial={reduced ? undefined : { opacity: 0 }}
      animate={reduced ? undefined : { opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.lightboxCard}>
        <div className={styles.lightboxTop}>
          <div className={styles.lightboxCount}>
            {index + 1}/{images.length}
          </div>
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.lightboxImgWrap}>
          <motion.img
            key={current}
            className={styles.lightboxImg}
            src={current}
            alt="Tourism"
            loading="eager"
            initial={reduced ? undefined : { scale: 0.98, opacity: 0.6 }}
            animate={reduced ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
        </div>

        <div className={styles.lightboxNav}>
          <button
            type="button"
            className={styles.lightboxBtn}
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.lightboxBtn}
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 120, damping: 14 });
  const ry = useSpring(x, { stiffness: 120, damping: 14 });

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set((px - 0.5) * 10);
    y.set((0.5 - py) * 10);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={styles.tiltCard}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
    >
      <motion.div
        className={styles.tiltInner}
        style={{ rotateX: rx, rotateY: ry }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function GalleryGrid({ images, onOpen }) {
  return (
    <div className={styles.galleryGrid}>
      {images.slice(0, 6).map((src, idx) => (
        <button
          key={src + idx}
          type="button"
          className={styles.galleryTile}
          onClick={() => onOpen(images, idx)}
          aria-label="Open image"
        >
          <img
            className={styles.galleryImg}
            src={src}
            alt="Tourism"
            loading="lazy"
          />
          {idx === 5 && images.length > 6 ? (
            <span className={styles.moreOverlay}>+{images.length - 6}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function SectionHead({ title, subtitle, children }) {
  return (
    <div className={styles.head}>
      <div>
        <h2 className={styles.h2}>{title}</h2>
        {subtitle ? <p className={styles.sub}>{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

const STATE_SPECIFIC_DATA = {
  "Andhra Pradesh": { overview: "Famous for ancient temples, rich culture, and beautiful coastline.", places: [{ name: "Tirupati", desc: "Spiritual capital with the revered Venkateswara Temple.", img: "tirupati,temple" }, { name: "Araku Valley", desc: "Scenic hill station known for coffee plantations.", img: "araku,valley" }, { name: "Visakhapatnam", desc: "Vibrant coastal city with beautiful beaches.", img: "visakhapatnam,beach" }] },
  "Arunachal Pradesh": { overview: "The land of dawn-lit mountains with pristine valleys and monasteries.", places: [{ name: "Tawang", desc: "India's largest monastery set in snow-capped mountains.", img: "tawang,monastery" }, { name: "Ziro Valley", desc: "A picturesque valley home to the Apatani tribe.", img: "ziro,valley" }, { name: "Sela Pass", desc: "Breathtaking high-altitude mountain pass.", img: "selapass,snow" }] },
  "Assam": { overview: "Known for wildlife, archaeological sites, and tea plantations.", places: [{ name: "Kaziranga", desc: "National park famous for one-horned rhinoceros.", img: "kaziranga,rhino" }, { name: "Majuli", desc: "The world's largest river island on the Brahmaputra.", img: "majuli,island" }, { name: "Guwahati", desc: "City of temples including the famous Kamakhya Temple.", img: "guwahati,temple" }] },
  "Bihar": { overview: "A land of deep historical roots and Buddhist heritage.", places: [{ name: "Bodh Gaya", desc: "The place where Lord Buddha attained enlightenment.", img: "bodhgaya,temple" }, { name: "Nalanda", desc: "Ruins of the ancient university and center of learning.", img: "nalanda,ruins" }, { name: "Patna", desc: "Ancient city of Pataliputra on the banks of the Ganges.", img: "patna,river" }] },
  "Chhattisgarh": { overview: "A heavily forested state known for its waterfalls and temples.", places: [{ name: "Chitrakote Falls", desc: "The Niagara Falls of India.", img: "chitrakote,waterfall" }, { name: "Bastar", desc: "Tribal culture, dense forests, and ancient arts.", img: "bastar,tribe" }, { name: "Sirpur", desc: "An ancient village with a rich archaeological history.", img: "sirpur,monument" }] },
  "Goa": { overview: "World-famous beaches, Portuguese heritage, and vibrant nightlife.", places: [{ name: "Baga & Calangute", desc: "Bustling beaches with water sports and shacks.", img: "goa,beach" }, { name: "Old Goa", desc: "Historic churches like the Basilica of Bom Jesus.", img: "goa,church" }, { name: "Dudhsagar Falls", desc: "A spectacular four-tiered waterfall.", img: "dudhsagar,waterfall" }] },
  "Gujarat": { overview: "Home to the Rann of Kutch, Asiatic lions, and rich heritage.", places: [{ name: "Rann of Kutch", desc: "A massive expanse of white salt desert.", img: "kutch,desert" }, { name: "Gir National Park", desc: "The only home of the Asiatic lion.", img: "gir,lion" }, { name: "Somnath Temple", desc: "One of the twelve Jyotirlinga shrines of Shiva.", img: "somnath,temple" }] },
  "Haryana": { overview: "Rich in agricultural landscape and historical battlegrounds.", places: [{ name: "Kurukshetra", desc: "The site of the epic Mahabharata war.", img: "kurukshetra,history" }, { name: "Sultanpur", desc: "A popular bird sanctuary for migratory birds.", img: "sultanpur,birds" }, { name: "Surajkund", desc: "Known for the vibrant annual crafts mela.", img: "surajkund,crafts" }] },
  "Himachal Pradesh": { overview: "A majestic mountain state offering scenic towns and adventure.", places: [{ name: "Manali", desc: "Popular hill station and gateway to adventure sports.", img: "manali,snow" }, { name: "Shimla", desc: "The colonial-era summer capital of British India.", img: "shimla,hills" }, { name: "Dharamshala", desc: "Home to the Dalai Lama with strong Tibetan culture.", img: "dharamshala,monastery" }] },
  "Jharkhand": { overview: "A land of waterfalls, forests, and rich tribal history.", places: [{ name: "Ranchi", desc: "City of waterfalls and scenic landscapes.", img: "ranchi,waterfall" }, { name: "Betla National Park", desc: "Rich biodiversity and the Palamu Fort.", img: "betla,forest" }, { name: "Deoghar", desc: "A major Hindu pilgrimage center.", img: "deoghar,temple" }] },
  "Karnataka": { overview: "A blend of modern tech hubs, ancient ruins, and lush coasts.", places: [{ name: "Hampi", desc: "The magnificent ruins of the Vijayanagara Empire.", img: "hampi,ruins" }, { name: "Mysore", desc: "The cultural capital famous for the Mysore Palace.", img: "mysore,palace" }, { name: "Coorg", desc: "The Scotland of India, famous for coffee and mist.", img: "coorg,hills" }] },
  "Kerala": { overview: "God's Own Country, famous for its backwaters and Ayurveda.", places: [{ name: "Munnar", desc: "Endless rolling hills covered in tea plantations.", img: "munnar,tea" }, { name: "Alleppey", desc: "A network of backwaters explored on houseboats.", img: "alleppey,houseboat" }, { name: "Wayanad", desc: "Pristine nature, waterfalls, and spice trails.", img: "wayanad,nature" }] },
  "Madhya Pradesh": { overview: "The Heart of India, known for wildlife and ancient temples.", places: [{ name: "Khajuraho", desc: "Stunning temples known for intricate sculptures.", img: "khajuraho,temple" }, { name: "Bandhavgarh", desc: "National park famous for its high tiger density.", img: "bandhavgarh,tiger" }, { name: "Sanchi", desc: "The iconic Buddhist stupa dating back to Ashoka.", img: "sanchi,stupa" }] },
  "Maharashtra": { overview: "A vast state with the bustling city of Mumbai and ancient caves.", places: [{ name: "Ajanta & Ellora", desc: "Ancient rock-cut caves and a UNESCO World Heritage site.", img: "ellora,caves" }, { name: "Mahabaleshwar", desc: "A forested hill station famous for its strawberries.", img: "mahabaleshwar,hills" }, { name: "Mumbai", desc: "The financial capital, home to the Gateway of India.", img: "mumbai,gateway" }] },
  "Manipur": { overview: "A jewel of the Northeast with floating national parks.", places: [{ name: "Loktak Lake", desc: "The largest freshwater lake in Northeast India.", img: "loktak,lake" }, { name: "Imphal", desc: "The capital city with rich history and markets.", img: "imphal,market" }, { name: "Keibul Lamjao", desc: "The world's only floating national park.", img: "manipur,wildlife" }] },
  "Meghalaya": { overview: "The abode of clouds, featuring living root bridges and waterfalls.", places: [{ name: "Cherrapunji", desc: "One of the wettest places on earth with living root bridges.", img: "cherrapunji,waterfall" }, { name: "Shillong", desc: "The Scotland of the East, a beautiful hill station.", img: "shillong,hills" }, { name: "Dawki", desc: "Famous for its crystal clear Umngot river.", img: "dawki,river" }] },
  "Mizoram": { overview: "A tranquil state known for its dramatic landscapes and pleasant climate.", places: [{ name: "Aizawl", desc: "The scenic capital city perched on a ridge.", img: "aizawl,city" }, { name: "Phawngpui", desc: "The Blue Mountain, highest peak in the state.", img: "mizoram,mountain" }, { name: "Champhai", desc: "A bustling town with beautiful vineyards and views.", img: "champhai,valley" }] },
  "Nagaland": { overview: "Famous for its indigenous tribes, festivals, and lush hills.", places: [{ name: "Kohima", desc: "The capital city, known for its WW2 history.", img: "kohima,hills" }, { name: "Dzukou Valley", desc: "Stunning valley known for its unique lilies.", img: "dzukou,valley" }, { name: "Hornbill Festival", desc: "A vibrant showcase of Naga culture and traditions.", img: "nagaland,culture" }] },
  "Odisha": { overview: "A state celebrated for its coastal beauty and spectacular temples.", places: [{ name: "Konark", desc: "The magnificent 13th-century Sun Temple.", img: "konark,temple" }, { name: "Puri", desc: "Home to the revered Jagannath Temple and beaches.", img: "puri,beach" }, { name: "Chilika Lake", desc: "Asia's largest brackish water lagoon, a haven for birds.", img: "chilika,lake" }] },
  "Punjab": { overview: "The heartland of Sikh culture, agriculture, and rich cuisine.", places: [{ name: "Amritsar", desc: "Home to the iconic and spiritual Golden Temple.", img: "amritsar,goldentemple" }, { name: "Wagah Border", desc: "Famous for the daily flag-lowering ceremony.", img: "wagah,border" }, { name: "Chandigarh", desc: "The well-planned city known for its Rock Garden.", img: "chandigarh,garden" }] },
  "Rajasthan": { overview: "The land of kings, known for its majestic forts and desert culture.", places: [{ name: "Jaipur", desc: "The Pink City, full of royal palaces and bazaars.", img: "jaipur,palace" }, { name: "Udaipur", desc: "The City of Lakes, offering romantic boat rides.", img: "udaipur,lake" }, { name: "Jaisalmer", desc: "The Golden City surrounded by the Thar Desert.", img: "jaisalmer,desert" }] },
  "Sikkim": { overview: "A Himalayan wonderland with glaciers, alpine meadows, and monasteries.", places: [{ name: "Gangtok", desc: "The vibrant capital with stunning views of Kanchenjunga.", img: "gangtok,city" }, { name: "Tsomgo Lake", desc: "A beautiful glacial lake surrounded by mountains.", img: "sikkim,lake" }, { name: "Nathu La", desc: "A high-altitude mountain pass on the Indo-China border.", img: "nathula,snow" }] },
  "Tamil Nadu": { overview: "Famous for its Dravidian-style Hindu temples and classical arts.", places: [{ name: "Madurai", desc: "Home to the elaborately sculpted Meenakshi Amman Temple.", img: "madurai,temple" }, { name: "Ooty", desc: "A popular hill station in the Nilgiri hills.", img: "ooty,hills" }, { name: "Mahabalipuram", desc: "Coastal town known for its rock-cut monuments.", img: "mahabalipuram,monument" }] },
  "Telangana": { overview: "A rich blend of Persian and Indian heritage and modern IT hubs.", places: [{ name: "Hyderabad", desc: "The Pearl City, home to the iconic Charminar.", img: "hyderabad,charminar" }, { name: "Warangal", desc: "Known for the ancient Warangal Fort and Thousand Pillar Temple.", img: "warangal,ruins" }, { name: "Ramoji Film City", desc: "One of the largest film studio complexes in the world.", img: "ramoji,film" }] },
  "Tripura": { overview: "A princely state known for its royal palaces and ancient temples.", places: [{ name: "Agartala", desc: "The capital city featuring the magnificent Ujjayanta Palace.", img: "agartala,palace" }, { name: "Neermahal", desc: "A stunning water palace situated in the middle of a lake.", img: "neermahal,water" }, { name: "Unakoti", desc: "Ancient rock-cut sculptures set amidst lush forests.", img: "unakoti,sculpture" }] },
  "Uttar Pradesh": { overview: "The heart of North India, home to the Taj Mahal and sacred rivers.", places: [{ name: "Agra", desc: "The city of the Taj Mahal, a wonder of the world.", img: "tajmahal,monument" }, { name: "Varanasi", desc: "The spiritual capital, known for its ghats on the Ganges.", img: "varanasi,ghat" }, { name: "Lucknow", desc: "The City of Nawabs, known for its architecture and cuisine.", img: "lucknow,architecture" }] },
  "Uttarakhand": { overview: "Devbhumi (Land of Gods), famous for Himalayan pilgrimages and yoga.", places: [{ name: "Rishikesh", desc: "The yoga capital and gateway to the Garhwal Himalayas.", img: "rishikesh,ganges" }, { name: "Nainital", desc: "A popular resort town set around a beautiful lake.", img: "nainital,lake" }, { name: "Jim Corbett", desc: "India's oldest national park, famous for Bengal tigers.", img: "corbett,tiger" }] },
  "West Bengal": { overview: "A state rich in literary culture, heritage, and the Sunderbans mangroves.", places: [{ name: "Kolkata", desc: "The cultural capital, home to the Victoria Memorial.", img: "kolkata,victoria" }, { name: "Darjeeling", desc: "Famous for its tea gardens and the Himalayan Railway.", img: "darjeeling,tea" }, { name: "Sundarbans", desc: "The vast mangrove forest and home of the Bengal tiger.", img: "sundarbans,tiger" }] },
  "Andaman and Nicobar Islands": { overview: "A tropical paradise with pristine beaches and marine life.", places: [{ name: "Havelock Island", desc: "Famous for its spectacular Radhanagar Beach.", img: "havelock,beach" }, { name: "Port Blair", desc: "The capital city and home to the historic Cellular Jail.", img: "portblair,history" }, { name: "Neil Island", desc: "Known for coral reefs and peaceful white sandy beaches.", img: "neil,coral" }] },
  "Chandigarh": { overview: "A well-planned modern city designed by Le Corbusier.", places: [{ name: "Rock Garden", desc: "A massive garden made entirely of industrial and home waste.", img: "chandigarh,garden" }, { name: "Sukhna Lake", desc: "A beautiful reservoir perfect for boating and relaxing.", img: "sukhna,lake" }, { name: "Rose Garden", desc: "Asia's largest rose garden with thousands of varieties.", img: "chandigarh,roses" }] },
  "Dadra and Nagar Haveli and Daman and Diu": { overview: "Coastal territories blending Portuguese history with scenic beauty.", places: [{ name: "Daman Fort", desc: "Historic Portuguese fort along the coast.", img: "daman,fort" }, { name: "Diu Island", desc: "Serene island known for Nagoa Beach and Diu Fort.", img: "diu,beach" }, { name: "Silvassa", desc: "A quiet town known for its lush gardens and tribal culture.", img: "silvassa,nature" }] },
  "Delhi": { overview: "The historic and dynamic capital city of India.", places: [{ name: "Red Fort", desc: "The massive Mughal fort complex.", img: "delhi,redfort" }, { name: "Qutub Minar", desc: "A towering 73-meter tall minaret and UNESCO site.", img: "delhi,qutub" }, { name: "India Gate", desc: "A war memorial arch spanning the Rajpath.", img: "delhi,indiagate" }] },
  "Jammu and Kashmir": { overview: "Paradise on Earth, known for its stunning valleys and lakes.", places: [{ name: "Srinagar", desc: "Famous for Dal Lake, houseboats, and Mughal gardens.", img: "srinagar,lake" }, { name: "Gulmarg", desc: "A popular skiing destination with a beautiful gondola ride.", img: "gulmarg,snow" }, { name: "Pahalgam", desc: "A picturesque valley and starting point for the Amarnath Yatra.", img: "pahalgam,valley" }] },
  "Ladakh": { overview: "A high-altitude desert known for breathtaking landscapes and monasteries.", places: [{ name: "Pangong Lake", desc: "A mesmerizing lake that changes colors.", img: "pangong,lake" }, { name: "Nubra Valley", desc: "Known for its sand dunes and double-humped camels.", img: "nubra,desert" }, { name: "Leh Palace", desc: "A former royal palace overlooking the town of Leh.", img: "leh,palace" }] },
  "Lakshadweep": { overview: "An archipelago of stunning coral islands in the Arabian Sea.", places: [{ name: "Agatti Island", desc: "Known for its spectacular coral reefs and clear waters.", img: "agatti,coral" }, { name: "Bangaram Atoll", desc: "A breathtaking teardrop-shaped island.", img: "lakshadweep,ocean" }, { name: "Minicoy Island", desc: "The southernmost island with a rich Maldivian influence.", img: "minicoy,beach" }] },
  "Puducherry": { overview: "A charming coastal town with a strong French colonial legacy.", places: [{ name: "Auroville", desc: "An experimental township dedicated to human unity.", img: "auroville,architecture" }, { name: "Promenade Beach", desc: "A popular stretch of beachfront in the city center.", img: "puducherry,beach" }, { name: "French Quarter", desc: "Streets lined with mustard-yellow colonial villas.", img: "puducherry,street" }] }
};

function makeStateCard(stateName) {
  const data = STATE_SPECIFIC_DATA[stateName] || {
    overview: `${stateName} blends heritage, nature and modern experiences across regions.`,
    places: [
      { name: `${stateName} Heritage`, desc: `Historical landmarks of ${stateName}.`, img: `${stateName.toLowerCase().replace(/ /g, '')},heritage` },
      { name: `${stateName} Nature`, desc: `Lakes, hills and parks of ${stateName}.`, img: `${stateName.toLowerCase().replace(/ /g, '')},nature` },
      { name: `${stateName} Culture`, desc: `Cultural centers and markets of ${stateName}.`, img: `${stateName.toLowerCase().replace(/ /g, '')},culture` }
    ]
  };

  return {
    stateName,
    overview: data.overview,
    famousPlaces: data.places.map((p, i) => ({
      name: p.name,
      photos: [
        `https://loremflickr.com/1400/900/${p.img}?lock=${i+100}`,
        `https://loremflickr.com/1400/900/${p.img}?lock=${i+200}`,
        `https://loremflickr.com/1400/900/${p.img}?lock=${i+300}`
      ],
      description: p.desc,
    })),
    categories: {
      historical: [`${stateName} forts & museums`],
      nature: [`${stateName} viewpoints & parks`],
      religious: [`temples & spiritual sites of ${stateName}`],
      adventure: [`treks and outdoor trails in ${stateName}`],
      wildlife: [`sanctuaries and reserves near ${stateName}`],
      hillStations: [`hill towns in ${stateName}`],
      beaches: [`beaches or riverfronts in ${stateName}`],
      cultural: [`local crafts, festivals and markets of ${stateName}`],
    },
  };
}

function popularityScore(spotName) {
  // stable pseudo-score 60..99
  let hash = 0;
  for (let i = 0; i < spotName.length; i++)
    hash = (hash * 31 + spotName.charCodeAt(i)) >>> 0;
  return 60 + (hash % 40);
}

function filteredSort(list, { query, type, sortKey }) {
  const q = query.trim().toLowerCase();
  const res = list.filter((d) => {
    if (!q) return type === "All" || d.types.includes(type);
    const hay =
      `${d.name} ${d.state} ${d.location} ${d.types.join(" ")}`.toLowerCase();
    const matchQuery = hay.includes(q);
    const matchType = type === "All" || d.types.includes(type);
    return matchQuery && matchType;
  });

  const sorted = [...res].sort((a, b) => {
    if (sortKey === "rating") return b.rating - a.rating;
    if (sortKey === "popularity")
      return popularityScore(b.name) - popularityScore(a.name);
    return a.name.localeCompare(b.name);
  });

  return sorted;
}

export function TourismPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);
  const [showAllStates, setShowAllStates] = useState(false);
  const [stateSearch, setStateSearch] = useState("");

  const openLightbox = (images, idx) => {
    setLightboxImages(images);
    setLightboxStartIndex(idx);
    setLightboxOpen(true);
  };

  const reduced = usePrefersReducedMotion();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 40, damping: 20 });
  const ry = useSpring(x, { stiffness: 40, damping: 20 });

  function handleMouseMove(e) {
    if (typeof window === "undefined" || reduced) return;
    const px = (e.clientX / window.innerWidth - 0.5) * 30; // Max 15deg tilt
    const py = (e.clientY / window.innerHeight - 0.5) * 30;
    x.set(px);
    y.set(-py);
  }

  const famousSpots = useMemo(() => {
    const type = filterType;
    return filteredSort(TOURISM_SPOTS, {
      query: search,
      type,
      sortKey: sortBy,
    });
  }, [search, filterType, sortBy]);

  const heroStats = useMemo(() => {
    return {
      domesticTourists: 220000000,
      unescoHeritage: 42,
      statesCovered: 28,
      famousDestinations: 50,
    };
  }, []);

  const states = useMemo(() => STATES.map(makeStateCard), []);

  const displayedStates = useMemo(() => {
    let list = states;
    if (stateSearch.trim()) {
      const q = stateSearch.trim().toLowerCase();
      list = list.filter(s => s.stateName.toLowerCase().includes(q));
    }
    return stateSearch.trim() || showAllStates ? list : list.slice(0, 2);
  }, [states, stateSearch, showAllStates]);

  const graphData = useMemo(() => {
    // Dummy graph categories with stable values.
    const base = [72, 55, 61, 49, 67];
    return [
      { label: "Heritage", value: base[0], hint: "UNESCO + monuments" },
      { label: "Nature", value: base[1], hint: "Lakes, hills, parks" },
      { label: "Cultural", value: base[2], hint: "Arts, crafts & festivals" },
      { label: "Adventure", value: base[3], hint: "Treks, rafting & trails" },
      { label: "Coastal", value: base[4], hint: "Beaches & backwaters" },
    ];
  }, []);

  return (
    <div className={styles.page} onMouseMove={handleMouseMove}>
      {/* 3D Dynamic Animated Background */}
      <div className={styles.bgWrapper}>
        <motion.div
          className={styles.bgOrbs}
          aria-hidden="true"
          style={{
            rotateX: rx,
            rotateY: ry,
          }}
        >
          {[
            { x: "5%", y: "10%", s: "40vw", c: "rgba(56, 189, 248, 0.65)", o: 0.5, b: "60px", d: "12s", dl: "0s", z: "-150px" },
            { x: "60%", y: "40%", s: "50vw", c: "rgba(124, 58, 237, 0.6)", o: 0.45, b: "80px", d: "18s", dl: "-4s", z: "50px" },
            { x: "30%", y: "60%", s: "45vw", c: "rgba(255, 30, 100, 0.5)", o: 0.4, b: "70px", d: "15s", dl: "-8s", z: "120px" },
            { x: "75%", y: "15%", s: "35vw", c: "rgba(255, 191, 0, 0.55)", o: 0.45, b: "50px", d: "14s", dl: "-2s", z: "-50px" },
            { x: "15%", y: "75%", s: "38vw", c: "rgba(0, 255, 150, 0.4)", o: 0.35, b: "65px", d: "16s", dl: "-10s", z: "80px" },
            { x: "50%", y: "50%", s: "60vw", c: "rgba(99, 102, 241, 0.3)", o: 0.5, b: "100px", d: "22s", dl: "-5s", z: "-200px" },
          ].map((p, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={styles.orb}
              style={{
                "--x": p.x,
                "--y": p.y,
                "--s": p.s,
                "--c": p.c,
                "--o": p.o,
                "--b": p.b,
                "--d": p.d,
                "--dl": p.dl,
                "--z": p.z,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className={styles.tourism3dTextProtect}>
        {/* HERO */}
        <section className={styles.hero} aria-label="Tourism hero">

          <motion.div className={styles.heroBackdrop} aria-hidden="true" />
          <motion.div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.container + " container"}>
            <div className={styles.heroGrid}>
              <ScrollReveal>
                <div>
                  <motion.h1

                  className={styles.heroTitle}
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Discover the Beauty, History, Culture & Wonders of India
                </motion.h1>

                <p className={styles.heroLead}>
                  A modern tourism explorer designed for smooth browsing,
                  cinematic galleries, and state-wise inspiration.
                </p>

                <div className={styles.heroCtas}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() =>
                      document
                        .getElementById("famous-spots")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <span className={styles.btnIcon} aria-hidden="true">
                      ✦
                    </span>
                    Explore Tourism
                  </button>

                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() =>
                      document
                        .getElementById("state-explorer")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <span className={styles.btnIcon} aria-hidden="true">
                      ⌖
                    </span>
                    State-wise Explorer
                  </button>
                </div>

                <div className={styles.heroBadges}>
                  <div className={`${styles.badgeCard} ${styles.glass}`}>
                    <div className={styles.badgeTop}>
                      <span className={styles.badgeLabel}>
                        Domestic Tourists
                      </span>
                      <span className={styles.badgeSpark} aria-hidden="true">
                        ▲
                      </span>
                    </div>
                    <div className={styles.badgeValue}>
                      {heroStats.domesticTourists.toLocaleString()}
                    </div>
                  </div>
                  <div className={`${styles.badgeCard} ${styles.glass}`}>
                    <div className={styles.badgeTop}>
                      <span className={styles.badgeLabel}>UNESCO Heritage</span>
                      <span className={styles.badgeSpark} aria-hidden="true">
                        ★
                      </span>
                    </div>
                    <div className={styles.badgeValue}>
                      {heroStats.unescoHeritage}
                    </div>
                  </div>
                  <div className={`${styles.badgeCard} ${styles.glass}`}>
                    <div className={styles.badgeTop}>
                      <span className={styles.badgeLabel}>States & UTs</span>
                      <span className={styles.badgeSpark} aria-hidden="true">
                        ⎈
                      </span>
                    </div>
                    <div className={styles.badgeValue}>
                      {heroStats.statesCovered}
                    </div>
                  </div>
                  <div className={`${styles.badgeCard} ${styles.glass}`}>
                    <div className={styles.badgeTop}>
                      <span className={styles.badgeLabel}>
                        Famous Destinations
                      </span>
                      <span className={styles.badgeSpark} aria-hidden="true">
                        ✈
                      </span>
                    </div>
                    <div className={styles.badgeValue}>
                      {heroStats.famousDestinations}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className={styles.heroRight}>
                <div className={styles.heroFloatGrid}>
                  <TiltCard>
                    <div className={`${styles.floatCard} ${styles.glass}`}>
                      <p className={styles.floatTitle}>Cinematic Galleries</p>
                      <p className={styles.floatText}>
                        Lightbox, smooth transitions, lazy loading and
                        fullscreen previews.
                      </p>
                    </div>
                  </TiltCard>
                  <TiltCard>
                    <div className={`${styles.floatCard} ${styles.glass}`}>
                      <p className={styles.floatTitle}>Neon Glass UI</p>
                      <p className={styles.floatText}>
                        Deep blues, purple glows, gold highlights and responsive
                        cards.
                      </p>
                    </div>
                  </TiltCard>
                  <TiltCard>
                    <div className={`${styles.floatCard} ${styles.glass}`}>
                      <p className={styles.floatTitle}>Search & Filter</p>
                      <p className={styles.floatText}>
                        Find destinations by place/state and tourism type. Sort
                        by popularity or rating.
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className={`${styles.section} ${styles.sectionTight}`}>
        <div className={styles.container + " container"}>
          <SectionHead
            title="India Tourism Overview"
            subtitle="Plan inspired trips with a premium, modern dashboard feel."
          />
          <div className={styles.grid3}>
            {[
              {
                t: "Heritage Trails",
                s: "Historical wonders, royal cities and UNESCO landmarks.",
              },
              {
                t: "Culture & Festivals",
                s: "Arts, crafts, traditions and local celebrations across regions.",
              },
              {
                t: "Nature Escapes",
                s: "Lakes, hills, deserts and wildlife sanctuaries for every mood.",
              },
            ].map((x) => (
              <ScrollReveal key={x.t}>
                <div className={`${styles.card} ${styles.cardNeon}`}>
                  <h3 className={styles.cardTitle}>{x.t}</h3>
                  <div className={styles.cardMeta}>{x.s}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Famous spots */}
      <section id="famous-spots" className={styles.section}>
        <div className={styles.container + " container"}>
          <ScrollReveal>
            <SectionHead
              title="Famous Tourism Spots of India"
              subtitle="Interactive destination cards with galleries and quick highlights."
            />
          </ScrollReveal>

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by place/state (e.g., Taj, Goa, Ladakh)"
              aria-label="Search by place or state"
            />

            <select
              className={`${styles.input} ${styles.select}`}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by tourism type"
            >
              <option value="All">All Types</option>
              {TOURISM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              className={`${styles.input} ${styles.select}`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          <div className={styles.grid4}>
            {famousSpots.map((d) => (
              <ScrollReveal key={d.name}>
                <motion.div whileHover={{ y: -6 }} className={styles.card}>
                  <div className={styles.destMedia}>
                    <img
                      className={styles.destImg}
                      src={d.gallery?.[0] || DEFAULT_GALLERY[0]}
                      alt={d.name}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.destTop}>
                    <div>
                      <h3 className={styles.destName}>{d.name}</h3>
                      <div className={styles.meta}>
                        {d.state} • {d.location}
                      </div>
                    </div>
                    <div>
                      <StarBar rating={d.rating} />
                    </div>
                  </div>

                  <div className={styles.typeRow}>
                    {d.types.slice(0, 3).map((t) => (
                      <span key={t} className={styles.typeTag}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className={styles.destBody}>{d.shortDescription}</div>

                  <div className={styles.ratingRow}>
                    <div className={styles.pill}>
                      Rating: {d.rating.toFixed(1)}
                    </div>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() =>
                        openLightbox(
                          d.gallery?.length ? d.gallery : DEFAULT_GALLERY,
                          0,
                        )
                      }
                    >
                      View Gallery
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* State-wise explorer */}
      <section id="state-explorer" className={styles.section}>
        <div className={styles.container + " container"}>
          <ScrollReveal>
            <SectionHead
              title="State-wise Tourism Explorer"
              subtitle="All states & union territories with curated categories and destination galleries."
            >
              <input
                className={styles.input}
                style={{ maxWidth: '280px', margin: 0 }}
                placeholder="Search state..."
                value={stateSearch}
                onChange={(e) => {
                  setStateSearch(e.target.value);
                  if (e.target.value && !showAllStates) setShowAllStates(true);
                }}
                aria-label="Search states"
              />
            </SectionHead>
          </ScrollReveal>

          <AnimatePresence initial={false}>
            {displayedStates.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ padding: '20px 0', color: 'rgba(226,232,240,0.7)', textAlign: 'center' }}
              >
                No states found matching "{stateSearch}".
              </motion.div>
            )}
            {displayedStates.map((s) => (
              <motion.div
                key={s.stateName}
                initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                animate={{ height: "auto", opacity: 1, overflow: "visible" }}
                exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ScrollReveal>
                  <div className={styles.card} style={{ marginBottom: 18 }}>
                <div className={styles.destTop}>
                  <div>
                    <h3 className={styles.destName} style={{ fontSize: 18 }}>
                      {s.stateName}
                    </h3>
                    <div className={styles.meta}>{s.overview}</div>
                  </div>
                </div>

                <div className={styles.grid2} style={{ marginTop: 12 }}>
                  <div>
                    <div className={styles.sub} style={{ marginBottom: 10 }}>
                      Highlights
                    </div>
                    <div className={styles.chips}>
                      {[
                        ["Historical", s.categories.historical[0]],
                        ["Nature", s.categories.nature[0]],
                        ["Religious", s.categories.religious[0]],
                        ["Adventure", s.categories.adventure[0]],
                        ["Wildlife", s.categories.wildlife[0]],
                        ["Culture", s.categories.cultural[0]],
                      ].map(([k, v]) => (
                        <span key={k} className={styles.pill} title={v}>
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div 
                    className={styles.mapContainer} 
                    style={{ 
                      borderRadius: "16px", 
                      overflow: "hidden", 
                      border: "1px solid rgba(148, 163, 184, 0.14)",
                      background: "rgba(10, 18, 39, 0.35)",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "220px"
                    }}
                  >
                    <iframe
                      title={`${s.stateName} Tourism Map`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(s.stateName + " India")}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "220px", flexGrow: 1, filter: "invert(90%) hue-rotate(180deg)" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <div className={styles.sub} style={{ marginBottom: 10 }}>
                    Famous places & galleries
                  </div>
                  <div className={styles.grid3}>
                    {s.famousPlaces.map((p) => (
                      <div
                        key={p.name}
                        className={styles.card}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(130,170,255,0.18)",
                        }}
                      >
                        <div className={styles.destTop}>
                          <div>
                            <h4 className={styles.cardTitle}>{p.name}</h4>
                            <div className={styles.meta}>
                              Location: {s.stateName}
                            </div>
                          </div>
                          <div className={styles.pill}>Entry: Free/Varies</div>
                        </div>
                        <div className={styles.destBody}>{p.description}</div>
                        <div style={{ marginTop: 10 }}>
                          <GalleryGrid
                            images={p.photos}
                            onOpen={openLightbox}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            type="button"
            className={styles.viewMoreBtn}
            onClick={() => {
              if (showAllStates) {
                document.getElementById("state-explorer")?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => setShowAllStates(false), 150);
              } else {
                setShowAllStates(true);
              }
            }}
          >
            {showAllStates ? "View Less" : "View More"}
          </button>
        </div>
      </section>

      {/* Food & Culture */}
      <section className={styles.section}>
        <div className={styles.container + " container"}>
          <ScrollReveal>
            <SectionHead
              title="Food & Culture Highlights"
              subtitle="Cuisine, festivals and local traditions—discover what to try next."
            />
          </ScrollReveal>
          <div className={styles.grid3}>
            {[
              {
                t: "Cuisine Explorer",
                d: "From street classics to royal feasts—match flavors to destinations.",
              },
              {
                t: "Festival Tourism",
                d: "Celebrate in rhythm: fairs, processions and seasonal events.",
              },
              {
                t: "Cultural Crafts",
                d: "Handmade art, textiles and heritage workshops.",
              },
            ].map((x) => (
              <ScrollReveal key={x.t}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{x.t}</h3>
                  <div className={styles.destBody}>{x.d}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`${styles.section} ${styles.sectionTight}`}>
        <div className={styles.container + " container"}>
          <ScrollReveal>
            <SectionHead
              title="Historical Tourism Timeline"
              subtitle="A quick journey from ancient landmarks to modern travel experiences."
            />
          </ScrollReveal>

          <div className={styles.grid4}>
            {[
              {
                t: "Ancient Routes",
                d: "Trade, pilgrimage and early civilizations.",
              },
              {
                t: "Medieval Glory",
                d: "Architectural wonders and dynastic heritage.",
              },
              { t: "Colonial Era", d: "Hill stations and cultural fusion." },
              {
                t: "Modern India",
                d: "Accessible destinations and curated experiences.",
              },
            ].map((x) => (
              <ScrollReveal key={x.t}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{x.t}</h3>
                  <div className={styles.destBody}>{x.d}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics + Map + Sliders */}
      <section className={styles.section}>
        <div className={styles.container + " container"}>
          <ScrollReveal>
            <SectionHead
              title="Tourism Statistics"
              subtitle="Premium dashboard visuals (dummy charts) with animated emphasis."
            />
          </ScrollReveal>

          <div className={styles.statsGrid}>
            <div className={styles.barWrap}>
              <div className={styles.barLabelRow}>
                <div style={{ fontWeight: 950 }}>Tourism Momentum</div>
                <div style={{ color: "rgba(232,244,255,0.68)", fontSize: 12 }}>
                  Trending by category
                </div>
              </div>

              {graphData.map((g) => (
                <div className={styles.chartRow} key={g.label}>
                  <div className={styles.chartName}>{g.label}</div>
                  <div
                    className={styles.chartBar}
                    aria-label={g.label + " " + g.value}
                  >
                    <div
                      className={styles.chartFill}
                      style={{ width: `${g.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div 
              className={styles.mapContainer} 
              style={{ 
                borderRadius: "18px", 
                overflow: "hidden", 
                border: "1px solid rgba(148, 163, 184, 0.14)",
                background: "rgba(10, 18, 39, 0.35)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
              }}
            >
              <iframe
                title="India Tourism Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14371457.771235338!2d70.47334759999999!3d22.6708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px", flexGrow: 1, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className={styles.grid3} style={{ marginTop: 16 }}>
            {[
              {
                t: "Top visited places",
                d: "Most explored: monuments, coastal escapes and heritage cities.",
              },
              {
                t: "Seasonal recommendations",
                d: "Plan by weather windows—winter heritage & summer hill getaways.",
              },
              {
                t: "Travel quote",
                d: "“The world is a book and those who do not travel read only one page.”",
              },
            ].map((x) => (
              <ScrollReveal key={x.t}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{x.t}</h3>
                  <div className={styles.destBody}>{x.d}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.footerBanner}>
        <div className={styles.container + " container"}>

          <ScrollReveal>
            <div className={styles.footerBannerInner}>
              <h3 className={styles.footerBannerTitle}>
                Plan your next destination in India
              </h3>
              <div className={styles.footerBannerSub}>
                Cinematic galleries, state-wise ideas and premium UI—right where
                you need it.
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>

      {/* Keep project footer consistent, but also include tourism banner requirement inside page */}
      

      <Lightbox
        open={lightboxOpen}
        images={lightboxImages}
        startIndex={lightboxStartIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}

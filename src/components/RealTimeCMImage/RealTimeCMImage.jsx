import React, { useState, useEffect } from 'react';

export function RealTimeCMImage({ name, className, fallbackClassName }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    if (!name || name === '—' || name.includes('President')) {
      setError(true);
      return;
    }

    const fetchImage = async () => {
      try {
        const queryName = encodeURIComponent(name);
        // Try to fetch from Wikipedia first
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${queryName}&prop=pageimages&format=json&pithumbsize=300&origin=*`);
        const data = await res.json();
        const pages = data.query.pages;
        const page = Object.values(pages)[0];
        
        if (active && page && page.thumbnail && page.thumbnail.source) {
          setImgSrc(page.thumbnail.source);
        } else if (active) {
          // Fallback to UI Avatars if Wikipedia has no image
          setImgSrc(`https://ui-avatars.com/api/?name=${queryName}&background=random&size=200`);
        }
      } catch (e) {
        if (active) {
          setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`);
        }
      }
    };

    fetchImage();
    return () => { active = false; };
  }, [name]);

  if (error) {
    return (
      <div className={fallbackClassName} aria-hidden="true">
        🧑‍⚖️
      </div>
    );
  }

  if (!imgSrc) {
    // Loading state or empty
    return <div className={fallbackClassName} style={{ opacity: 0.5 }} aria-hidden="true">⏳</div>;
  }

  return <img className={className} src={imgSrc} alt={`${name} photo`} />;
}

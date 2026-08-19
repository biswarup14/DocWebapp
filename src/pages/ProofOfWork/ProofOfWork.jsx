import { useState, useCallback, useEffect } from 'react';
import SEO from '../../components/SEO/SEO';
import styles from './ProofOfWork.module.css';

const workItems = [
  { src: '/gall1.webp', alt: 'Restored smile after dental treatment' },
  { src: '/gall2.webp', alt: 'Pediatric dental care in progress' },
  { src: '/gall3.webp', alt: 'Preventive dental treatment result' },
  { src: '/gall4.jpeg', alt: 'Modern dental clinical setup' },
  { src: '/gall5.jpeg', alt: 'Advanced dental equipment and tools' },
  { src: '/gall6.jpeg', alt: 'Happy patient after dental procedure' },
];

export default function ProofOfWork() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i + 1) % workItems.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i - 1 + workItems.length) % workItems.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, close]);

  return (
    <>
      <SEO
        title="Proof of Work"
        description="See the results of our dental care — real work, real smiles. Incapremo Dental Care portfolio by Dr. Deepankar Bhattacharya."
        url="/proof-of-work"
      />
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Proof of Work</h1>
          <p className={styles.pageSubtitle}>A showcase of our dental care and clinical results.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {workItems.map((item, i) => (
              <button key={i} className={styles.card} onClick={() => setSelectedIndex(i)}>
                <div className={styles.imageWrap}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-label="Image lightbox">
          <button className={styles.lightboxClose} onClick={close} aria-label="Close">&times;</button>
          <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + workItems.length) % workItems.length); }} aria-label="Previous image">&#8249;</button>
          <img
            className={styles.lightboxImg}
            src={workItems[selectedIndex].src}
            alt={workItems[selectedIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % workItems.length); }} aria-label="Next image">&#8250;</button>
        </div>
      )}
    </>
  );
}

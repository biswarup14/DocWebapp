import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/PageHeader/PageHeader';
import SkeletonImage from '../../components/Skeleton/SkeletonImage';
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
  const touchStartX = useRef(0);

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSelectedIndex((i) => (i + 1) % workItems.length);
      } else {
        setSelectedIndex((i) => (i - 1 + workItems.length) % workItems.length);
      }
    }
  };

  return (
    <>
      <SEO
        url="/proof-of-work"
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Proof of Work', path: '/proof-of-work' },
        ]}
        extraSchemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            '@id': 'https://incapremodentalcare.com/proof-of-work/#gallery',
            name: 'Dental Treatment Results — Incapremo Dental Care',
            url: 'https://incapremodentalcare.com/proof-of-work',
            about: { '@id': 'https://incapremodentalcare.com/#dentist' },
            image: workItems.map((item) => ({
              '@type': 'ImageObject',
              contentUrl: `https://incapremodentalcare.com${item.src}`,
              caption: item.alt,
            })),
          },
        ]}
      />
      <PageHeader
        title="Proof of Work"
        subtitle="A showcase of our dental care and clinical results."
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {workItems.map((item, i) => (
              <button key={i} className={styles.card} onClick={() => setSelectedIndex(i)}>
                <div className={styles.imageWrap}>
                  <SkeletonImage src={item.src} alt={item.alt} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className={styles.lightbox}
            onClick={close}
            role="dialog"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button className={styles.lightboxClose} onClick={close} aria-label="Close">&times;</button>
            <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + workItems.length) % workItems.length); }} aria-label="Previous image">&#8249;</button>
            <motion.img
              key={selectedIndex}
              className={styles.lightboxImg}
              src={workItems[selectedIndex].src}
              alt={workItems[selectedIndex].alt}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % workItems.length); }} aria-label="Next image">&#8250;</button>
            <span className={styles.lightboxCounter}>{selectedIndex + 1} / {workItems.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

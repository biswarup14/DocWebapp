import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/PageHeader/PageHeader';
import SkeletonImage from '../../components/Skeleton/SkeletonImage';
import SEO from '../../components/SEO/SEO';
import styles from './ProofOfWork.module.css';


export default function ProofOfWork() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const close = useCallback(() => setSelectedIndex(null), []);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i + 1) % GALLERY_ITEMS.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
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
        setSelectedIndex((i) => (i + 1) % GALLERY_ITEMS.length);
      } else {
        setSelectedIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
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
        extraSchemas={[imageGallerySchema()]}
      />
      <PageHeader
        title="Proof of Work"
        subtitle="A showcase of our dental care and clinical results."
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {GALLERY_ITEMS.map((item, i) => (
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
            <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length); }} aria-label="Previous image">&#8249;</button>
            <motion.img
              key={selectedIndex}
              className={styles.lightboxImg}
              src={GALLERY_ITEMS[selectedIndex].src}
              alt={GALLERY_ITEMS[selectedIndex].alt}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % GALLERY_ITEMS.length); }} aria-label="Next image">&#8250;</button>
            <span className={styles.lightboxCounter}>{selectedIndex + 1} / {GALLERY_ITEMS.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

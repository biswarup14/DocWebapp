import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GalleryGrid.module.css';

const galleryItems = [
  { id: 1, title: 'Teeth Whitening', category: 'Whitening' },
  { id: 2, title: 'Dental Implant', category: 'Implants' },
  { id: 3, title: 'Smile Makeover', category: 'Cosmetic' },
  { id: 4, title: 'Invisalign Treatment', category: 'Orthodontics' },
  { id: 5, title: 'Crown Restoration', category: 'Restorative' },
  { id: 6, title: 'Bonding Treatment', category: 'Cosmetic' },
  { id: 7, title: 'Veneers', category: 'Cosmetic' },
  { id: 8, title: 'Full Mouth Rehab', category: 'Restorative' },
];

const categories = ['All', ...new Set(galleryItems.map((i) => i.category))];

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter);

  return (
    <>
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            className={styles.item}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(item)}
            layout
          >
            <div className={styles.placeholder}>
              <span>&#128247;</span>
            </div>
            <div className={styles.overlay}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemCategory}>{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>&#10005;</button>
              <div className={styles.lightboxPlaceholder}>
                <span>&#128247;</span>
              </div>
              <h3>{selected.title}</h3>
              <p>{selected.category}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

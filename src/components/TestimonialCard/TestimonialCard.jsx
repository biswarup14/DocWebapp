import { motion } from 'framer-motion';
import styles from './TestimonialCard.module.css';

export default function TestimonialCard({ name, rating, text, date }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.stars}>
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
      <p className={styles.text}>"{text}"</p>
      <div className={styles.footer}>
        <div className={styles.avatar}>{name.charAt(0)}</div>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </motion.div>
  );
}

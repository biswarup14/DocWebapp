import { motion } from 'framer-motion';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ icon, title, description }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px var(--color-shadow)' }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
}

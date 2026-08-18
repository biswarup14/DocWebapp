import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './BlogCard.module.css';

export default function BlogCard({ id, title, excerpt, author, date, category, readTime }) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/blog/${id}`} className={styles.link}>
        <div className={styles.placeholder}>
          <span>&#128221;</span>
        </div>
        <div className={styles.content}>
          <span className={styles.category}>{category}</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.meta}>
            <span>{author}</span>
            <span>{date}</span>
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

import { useId } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQItem.module.css';

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span>{question}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          &#8250;
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.answerWrapper}
          >
            <p className={styles.answer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

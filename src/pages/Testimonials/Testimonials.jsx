import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import styles from './Testimonials.module.css';

const testimonials = [
  { name: 'Emily Rodriguez', rating: 5, text: 'Best dental experience ever! The staff is incredibly friendly and the office is spotless. Dr. Mitchell made my teeth whitening results amazing.', date: 'February 2025' },
  { name: 'Michael Chen', rating: 5, text: 'I was terrified of dentists until I came here. They made me feel completely at ease during my implant procedure. Highly recommend!', date: 'January 2025' },
  { name: 'Sarah Johnson', rating: 5, text: 'My kids actually look forward to their dental visits now. The pediatric care here is outstanding. Thank you, Dr. Parker!', date: 'March 2025' },
  { name: 'David Kim', rating: 5, text: 'The Invisalign treatment was seamless. Dr. Wong monitored every step and the results exceeded my expectations. My teeth are perfectly aligned now.', date: 'December 2024' },
  { name: 'Jennifer Lopez', rating: 4, text: 'Great experience with my crown restoration. The whole process was explained clearly and the final result looks completely natural.', date: 'November 2024' },
  { name: 'Robert Wilson', rating: 5, text: 'Had a dental emergency on a Saturday. They got me in immediately and took care of the problem. Lifesavers!', date: 'October 2024' },
  { name: 'Amanda Foster', rating: 5, text: 'The veneers transformed my smile completely. I finally feel confident in photos. The team here is truly exceptional.', date: 'September 2024' },
  { name: 'Carlos Mendez', rating: 5, text: 'Professional, clean, and caring. Every visit has been outstanding. This is the only dental practice I trust with my family.', date: 'August 2024' },
  { name: 'Lisa Taylor', rating: 4, text: 'Quick, painless, and thorough. The hygienist Maria is fantastic at explaining everything during cleaning. Very happy patient!', date: 'July 2024' },
];

export default function Testimonials() {
  return (
    <>
      <SEO title="Testimonials" description="Read what our patients say about Bright Smile Dental. Real reviews from real patients about their dental experiences." url="/testimonials" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Patient Testimonials</h1>
          <p className={styles.pageSubtitle}>Real reviews from our valued patients.</p>
          <div className={styles.ratingBadge}>
            <span className={styles.stars}>★★★★★</span>
            <span>4.9 Average Rating</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <TestimonialCard {...t} />
                <div className={styles.shareRow}>
                  <ShareButtons url={`https://brightsmiledental.com/testimonials`} title={t.text} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

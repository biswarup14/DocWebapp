import { useContext } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import AddTestimonial from '../../components/AddTestimonial/AddTestimonial';
import { TestimonialContext } from '../../context/TestimonialContext';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const { testimonials } = useContext(TestimonialContext);

  return (
    <>
      <SEO title="Testimonials" description="Read what our patients say about Bright Smile Dental. Real reviews from real patients about their dental experiences." url="/testimonials" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Patient Testimonials</h1>
          <p className={styles.pageSubtitle}>Real reviews from our valued patients.</p>
          <div className={styles.headerRow}>
            <div className={styles.ratingBadge}>
              <span className={styles.stars}>★★★★★</span>
              <span>4.9 Average Rating</span>
            </div>
            <AddTestimonial />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {testimonials.map((t, i) => (
              <motion.div key={t.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

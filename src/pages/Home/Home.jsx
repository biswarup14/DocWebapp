import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import AddTestimonial from '../../components/AddTestimonial/AddTestimonial';
import { TestimonialContext } from '../../context/TestimonialContext';
import styles from './Home.module.css';

const specializations = [
  { icon: '&#128737;', title: 'Preventive Dentistry', desc: 'Sealants, fluoride treatments & cavity prevention for children.' },
  { icon: '&#129463;', title: 'Pediatric Endodontics', desc: 'Pulp therapy & root canals for primary and young permanent teeth.' },
  { icon: '&#128165;', title: 'Dental Trauma Management', desc: 'Expert emergency care for broken, knocked-out or displaced teeth.' },
  { icon: '&#127793;', title: 'Space Maintenance & Growth Modification', desc: 'Appliances to guide proper alignment of developing teeth.' },
  { icon: '&#128156;', title: 'Pediatric Periodontics', desc: 'Diagnosis and treatment of gum conditions in children.' },
];

export default function Home() {
  const { testimonials } = useContext(TestimonialContext);
  const topTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <SEO title="Home" description="Professional pediatric dental care for the whole family. Book your appointment today for a healthier, brighter smile." url="/" />

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>
              Your Smile Is Our <span className={styles.highlight}>Priority</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Specialist pediatric dental care in a comfortable, modern environment. Expert treatment for children of all ages.
            </p>
            <p className={styles.doctorName}>Led by <strong>Dr. Deepankar Bhattacharya</strong></p>
            <div className={styles.heroActions}>
              <Link to="/appointment" className="btn btn-primary">Book Appointment</Link>
              <Link to="/services" className="btn btn-secondary">Our Specializations</Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <strong>15+</strong>
                <span>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <strong>10K+</strong>
                <span>Happy Patients</span>
              </div>
              <div className={styles.stat}>
                <strong>4.9</strong>
                <span>Star Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`section ${styles.specsSection}`}>
        <div className="container">
          <h2 className="section-title">Our Specializations</h2>
          <p className="section-subtitle">Expert pediatric dental care led by Dr. Deepankar Bhattacharya.</p>
          <div className={styles.specsGrid}>
            {specializations.map((s, i) => (
              <motion.div
                key={i}
                className={styles.specCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className={styles.specIcon} dangerouslySetInnerHTML={{ __html: s.icon }} />
                <h3 className={styles.specTitle}>{s.title}</h3>
                <p className={styles.specDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className={styles.specsMore}>
            <Link to="/services" className="btn btn-secondary">Learn More &#8594;</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready for a Brighter Smile?</h2>
            <p>Schedule your appointment today and experience the difference.</p>
            <Link to="/appointment" className="btn btn-accent">Book Now</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.testimonialsHeader}>
            <div>
              <h2 className="section-title">What Our Patients Say</h2>
              <p className="section-subtitle">Real reviews from real patients.</p>
            </div>
            <AddTestimonial />
          </div>
          <div className="grid grid-3">
            {topTestimonials.map((t, i) => (
              <TestimonialCard key={t.id || i} {...t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

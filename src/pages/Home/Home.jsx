import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import AddTestimonial from '../../components/AddTestimonial/AddTestimonial';
import { TestimonialContext } from '../../context/TestimonialContext';
import styles from './Home.module.css';

const specializations = [
  { image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop', title: 'Preventive Dentistry', desc: 'Sealants, fluoride treatments & cavity prevention for children.' },
  { image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop', title: 'Pediatric Endodontics', desc: 'Pulp therapy & root canals for primary and young permanent teeth.' },
  { image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop', title: 'Dental Trauma Management', desc: 'Expert emergency care for broken, knocked-out or displaced teeth.' },
  { image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop', title: 'Space Maintenance & Growth Modification', desc: 'Appliances to guide proper alignment of developing teeth.' },
  { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop', title: 'Pediatric Periodontics', desc: 'Diagnosis and treatment of gum conditions in children.' },
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
              Specialist pediatric dental care in a comfortable, modern environment. Expert treatment for children and adults of all ages.
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
                <strong>5K+</strong>
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
                <div className={styles.specImage}>
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
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

      <section className={`section ${styles.timingsSection}`}>
        <div className="container">
          <h2 className="section-title">Appointment Timings</h2>
          <p className="section-subtitle">We are available 6 days a week. Book a slot that works for you.</p>
          <div className={styles.timingsCard}>
            <div className={styles.timingsRow}>
              <span className={styles.timingsDays}>Monday &ndash; Saturday</span>
              <span className={styles.timingsDot}></span>
              <span className={styles.timingsSlots}>
                <strong>Morning:</strong> 10:00 AM &ndash; 2:00 PM &nbsp;&bull;&nbsp; <strong>Evening:</strong> 5:00 PM &ndash; 8:00 PM
              </span>
            </div>
            <p className={styles.timingsNote}>Closed on Sundays &amp; Public Holidays</p>
            <Link to="/appointment" className="btn btn-primary">Book an Appointment</Link>
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

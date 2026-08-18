import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import styles from './Home.module.css';

function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={styles.clock}>
      {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
    </span>
  );
}

const specializations = [
  { image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop', title: 'Preventive Dentistry', desc: 'Sealants, fluoride treatments & cavity prevention for children.' },
  { image: '/images_endodontics.jpeg', title: 'Pediatric Endodontics', desc: 'Pulp therapy & root canals for primary and young permanent teeth.' },
  { image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop', title: 'Dental Trauma Management', desc: 'Expert emergency care for broken, knocked-out or displaced teeth.' },
  { image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop', title: 'Space Maintenance & Growth Modification', desc: 'Appliances to guide proper alignment of developing teeth.' },
  { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop', title: 'Pediatric Periodontics', desc: 'Diagnosis and treatment of gum conditions in children.' },
];

export default function Home() {
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
              <Link to="/contact" className="btn btn-primary">Book Appointment</Link>
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

      <section className={styles.timingsBar}>
        <div className={`container ${styles.timingsBarInner}`}>
          <div className={styles.timingsLeft}>
            <div className={styles.timingsDays}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <span key={day} className={styles.dayBadge}>{day}</span>
              ))}
            </div>
          </div>
          <div className={styles.timingsCenter}>
            <div className={styles.timingsSlot}>
              <span className={styles.slotIcon}>&#9788;</span>
              <span className={styles.slotTime}>10 AM &ndash; 2 PM</span>
            </div>
            <span className={styles.timingsDivider}>&bull;</span>
            <div className={styles.timingsSlot}>
              <span className={styles.slotIcon}>&#9790;</span>
              <span className={styles.slotTime}>5 PM &ndash; 8 PM</span>
            </div>
          </div>
          <div className={styles.timingsRight}>
            <LiveClock />
          </div>
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

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Loved Your Visit?</h2>
            <p>Your feedback helps us grow and helps other families find quality dental care. Share your experience on Google!</p>
            <a
              href="https://maps.app.goo.gl/p3BLPCVnkG4gG2HB6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ backgroundColor: 'white', color: 'var(--color-primary)', fontWeight: 700 }}
            >
              Leave Us a Google Review &#9733;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

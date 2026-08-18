import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import styles from './Home.module.css';

const services = [
  { icon: '&#129463;', title: 'General Dentistry', description: 'Comprehensive checkups, cleanings, and preventive care to keep your smile healthy.' },
  { icon: '&#9728;', title: 'Teeth Whitening', description: 'Professional whitening treatments to brighten your smile by several shades.' },
  { icon: '&#128296;', title: 'Dental Implants', description: 'Permanent tooth replacement solutions that look and feel natural.' },
  { icon: '&#128171;', title: 'Orthodontics', description: 'Braces and Invisalign treatments to straighten teeth and correct bite issues.' },
  { icon: '&#10024;', title: 'Cosmetic Dentistry', description: 'Veneers, bonding, and smile makeovers for a picture-perfect smile.' },
  { icon: '&#128680;', title: 'Emergency Care', description: 'Same-day emergency dental services when you need them most.' },
];

const testimonials = [
  { name: 'Emily Rodriguez', rating: 5, text: 'Best dental experience ever! The staff is incredibly friendly and the office is spotless. Dr. Mitchell made my teeth whitening results amazing.', date: 'Feb 2025' },
  { name: 'Michael Chen', rating: 5, text: 'I was terrified of dentists until I came here. They made me feel completely at ease during my implant procedure. Highly recommend!', date: 'Jan 2025' },
  { name: 'Sarah Johnson', rating: 5, text: 'My kids actually look forward to their dental visits now. The pediatric care here is outstanding. Thank you, Dr. Parker!', date: 'Mar 2025' },
];

export default function Home() {
  return (
    <>
      <SEO title="Home" description="Professional dental care for the whole family. Book your appointment today for a healthier, brighter smile." url="/" />

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
              Experience exceptional dental care in a comfortable, modern environment. From routine cleanings to complete smile makeovers.
            </p>
            <div className={styles.heroActions}>
              <Link to="/appointment" className="btn btn-primary">Book Appointment</Link>
              <Link to="/services" className="btn btn-secondary">Our Services</Link>
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
          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.heroPlaceholder}>
              <span>&#129463;</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive dental care tailored to your needs.</p>
          <div className="grid grid-3">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
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
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">Real reviews from real patients.</p>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

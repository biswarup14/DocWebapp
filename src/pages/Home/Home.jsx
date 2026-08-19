import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import LiveClock from '../../components/LiveClock/LiveClock';
import FAQ, { faqSchema } from '../../components/FAQ/FAQ';
import SkeletonImage from '../../components/Skeleton/SkeletonImage';
import useCountUp from '../../hooks/useCountUp';
import styles from './Home.module.css';

const specializations = [
  { image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Preventive Dentistry', desc: 'Sealants, fluoride treatments & cavity prevention for children.' },
  { image: '/images_endodontics.jpeg', title: 'Pediatric Endodontics', desc: 'Pulp therapy & root canals for primary and young permanent teeth.' },
  { image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Dental Trauma Management', desc: 'Expert emergency care for broken, knocked-out or displaced teeth.' },
  { image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Space Maintenance & Growth Modification', desc: 'Appliances to guide proper alignment of developing teeth.' },
  { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Pediatric Periodontics', desc: 'Diagnosis and treatment of gum conditions in children.' },
];

const reasons = [
  { icon: '🎓', title: 'Specialist Training', desc: 'B.D.S. & M.D.S. in Pediatric Dentistry with 15+ years of experience.' },
  { icon: '👶', title: 'Child-Friendly', desc: 'Calm, welcoming environment designed to ease dental anxiety.' },
  { icon: '⚡', title: 'Emergency Care', desc: 'Same-day appointments for dental emergencies when you need them most.' },
  { icon: '🏆', title: '5,000+ Happy Patients', desc: 'Trusted by thousands of families across Purulia and beyond.' },
];

const statsData = [
  { end: 15, suffix: '+', label: 'Years Experience' },
  { end: 5, suffix: 'K+', label: 'Happy Patients' },
  { end: 4.9, suffix: '', label: 'Star Rating' },
  { end: 5, suffix: '', label: 'Specializations' },
];

function StatItem({ end, suffix, label }) {
  const { ref, count } = useCountUp(end, 2000);
  const display = end % 1 !== 0 ? count.toFixed(1) : Math.round(count);
  return (
    <div className={styles.statItem} ref={ref}>
      <strong>{display}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Incapremo Dental Care — best dentist near me in Purulia. Dr. Deepankar Bhattacharya offers pediatric dental care, emergency dentist services, and more. Book your appointment today."
        url="/"
        extraSchemas={[faqSchema]}
      />

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.heroBadge}>Pediatric & Family Dentistry</span>
            <h1 className={styles.heroTitle}>
              Your Smile Is Our<br /><span className={styles.highlight}>Priority</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Specialist dental care in a comfortable, modern environment.
              Expert treatment for children and adults of all ages in Purulia.
            </p>
            <p className={styles.doctorName}>Led by <strong>Dr. Deepankar Bhattacharya</strong> — B.D.S., M.D.S.</p>
            <div className={styles.heroActions}>
              <Link to="/contact" className="btn btn-primary">Book Appointment</Link>
              <Link to="/services" className="btn btn-secondary">Our Specializations</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.statsBar}>
        <div className={`container ${styles.statsBarInner}`}>
          {statsData.map((s, i) => (
            <StatItem key={i} {...s} />
          )).reduce((acc, item, i) => {
            if (i > 0) acc.push(<div key={`div-${i}`} className={styles.statDivider} />);
            acc.push(item);
            return acc;
          }, [])}
        </div>
      </section>

      <section className={styles.timingsBar}>
        <div className={`container ${styles.timingsBarInner}`}>
          <h2 className={styles.timingsTitle}>Available Dates</h2>
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
                  <SkeletonImage src={s.image} alt={s.title} />
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

      <section className={`section ${styles.reasonsSection}`}>
        <div className="container">
          <h2 className="section-title">Why Choose Incapremo Dental Care</h2>
          <p className="section-subtitle">Families across Purulia trust Dr. Deepankar Bhattacharya for gentle, expert dental care.</p>
          <div className={styles.reasonsGrid}>
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                className={styles.reasonCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className={styles.reasonIcon}>{r.icon}</span>
                <h3 className={styles.reasonTitle}>{r.title}</h3>
                <p className={styles.reasonDesc}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.emergencyBanner}`}>
        <div className="container">
          <div className={styles.emergencyBox}>
            <div className={styles.emergencyText}>
              <span className={styles.emergencyBadge}>&#128680; Dental Emergency?</span>
              <p>We provide same-day emergency dental care. Don&apos;t wait — call us now.</p>
            </div>
            <a href="tel:+917050576335" className="btn btn-accent">
              &#128222; Call Now
            </a>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Loved Your Visit?</h2>
            <p>Your feedback helps us grow and helps other families find quality dental care. Share your experience on Google!</p>
            <a
              href="https://maps.app.goo.gl/p3BLPCVnkG4gG2HB6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btnReview"
            >
              Leave Us a Google Review &#9733;
            </a>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </>
  );
}

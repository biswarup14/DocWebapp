import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import styles from './Emergency.module.css';

const emergencies = [
  { icon: '💥', title: 'Severe Toothache', description: 'Persistent or throbbing pain that doesn\'t respond to over-the-counter medication.', action: 'Call immediately for guidance.' },
  { icon: '🦷', title: 'Knocked-Out Tooth', description: 'A tooth that has been completely displaced due to trauma.', action: 'Handle by the crown, keep moist, and see us within 30 minutes.' },
  { icon: '💔', title: 'Cracked or Broken Tooth', description: 'A tooth that has cracked, chipped, or broken.', action: 'Rinse with warm water, apply cold compress, call us.' },
  { icon: '💧', title: 'Lost Filling or Crown', description: 'A dental filling or crown that has fallen out.', action: 'Apply dental wax or sugar-free gum to cover the area.' },
  { icon: '😬', title: 'Abscess or Swelling', description: 'A painful, pus-filled swelling in the gum or around a tooth.', action: 'Call immediately — this can be life-threatening.' },
  { icon: '🪛', title: 'Object Stuck Between Teeth', description: 'Something lodged between teeth that you cannot remove with floss.', action: 'Do not use sharp objects. Call us for safe removal.' },
];

export default function Emergency() {
  return (
    <>
      <SEO title="Emergency Dental Care" description="24/7 emergency dental care at Incapremo Dental Care. Same-day appointments for dental emergencies. Call us now!" url="/emergency" schema={false} />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EmergencyService',
            name: 'Incapremo Dental Care Emergency',
            telephone: '(+91) 7050576335',
          })}
        </script>
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <div className={styles.emergencyBadge}>&#128680; Emergency</div>
          <h1 className={styles.pageTitle}>Dental Emergency?</h1>
          <p className={styles.pageSubtitle}>We provide same-day emergency dental care. Don't wait — call us now.</p>
          <a href="tel:+917050576335" className={`btn btn-accent ${styles.btnLg}`}>
            &#128222; Call (+91) 7050576335
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Common Dental Emergencies</h2>
          <p className="section-subtitle">Know what to do in each situation.</p>
          <div className="grid grid-3">
            {emergencies.map((e, i) => (
              <motion.div
                key={i}
                className={styles.emergencyCard}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className={styles.emergencyIcon}>{e.icon}</span>
                <h3>{e.title}</h3>
                <p className={styles.emergencyDesc}>{e.description}</p>
                <p className={styles.emergencyAction}>{e.action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.infoSection}`}>
        <div className="container">
          <h2 className="section-title">After-Hours Emergency</h2>
          <div className={styles.afterHours}>
            <div className={styles.afterHoursContent}>
              <p>For emergencies outside of regular office hours:</p>
              <ul>
                <li><strong>Call our main line:</strong> (+91) 7050576335</li>
                <li><strong>Alternate Contact</strong> (+91) 9334335872</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container sectionCentered">
          <h2 className="section-title">Need to Book a Regular Visit?</h2>
          <p className="section-subtitle">For non-emergency appointments, schedule online.</p>
          <Link to="/contact" className="btn btn-primary">Book Appointment</Link>
        </div>
      </section>
    </>
  );
}

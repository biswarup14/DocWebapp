import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import styles from './Appointment.module.css';

const highlights = [
  { icon: '&#9989;', text: 'Same-day appointments available' },
  { icon: '&#128176;', text: 'Transparent pricing, no hidden fees' },
  { icon: '&#128222;', text: 'Call us: (+91) 7050576335' },
  { icon: '&#127775;', text: 'New patients receive a free consultation' },
];

export default function Appointment() {
  return (
    <>
      <SEO title="Book Appointment" description="Schedule your dental appointment online. Choose your preferred date and time. New patients get a free consultation!" url="/appointment" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Book an Appointment</h1>
          <p className={styles.pageSubtitle}>Fill out the form below and we'll confirm your appointment.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.appointmentGrid}>
            <div className={styles.formSide}>
              <AppointmentForm />
            </div>
            <div className={styles.infoSide}>
              <h2 className={styles.infoTitle}>Why Choose Us?</h2>
              <div className={styles.highlights}>
                {highlights.map((h, i) => (
                  <div key={i} className={styles.highlight}>
                    <span dangerouslySetInnerHTML={{ __html: h.icon }} />
                    <p>{h.text}</p>
                  </div>
                ))}
              </div>
              <div className={styles.emergencyNote}>
                <h3>&#128680; Dental Emergency?</h3>
                <p>For urgent dental issues, call us directly or visit our <Link to="/emergency">emergency page</Link> for after-hours contact information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

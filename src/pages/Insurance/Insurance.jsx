import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import styles from './Insurance.module.css';

const insurance = [
  'Delta Dental',
  'Cigna',
  'MetLife',
  'Aetna',
  'Blue Cross Blue Shield',
  'United Healthcare',
  'Guardian',
  'Humana',
];

const pricing = [
  { service: 'General Checkup & X-Ray', price: '$150', note: 'Without insurance' },
  { service: 'Professional Cleaning', price: '$120', note: 'Without insurance' },
  { service: 'Teeth Whitening', price: '$299', note: 'Professional in-office' },
  { service: 'Dental Filling', price: '$150 - $300', note: 'Depending on size' },
  { service: 'Root Canal', price: '$800 - $1,200', note: 'Per tooth' },
  { service: 'Crown', price: '$800 - $1,500', note: 'Porcelain crown' },
  { service: 'Dental Implant', price: '$2,500 - $4,500', note: 'Including crown' },
  { service: 'Invisalign', price: '$3,500 - $6,000', note: 'Full treatment' },
];

export default function Insurance() {
  return (
    <>
      <SEO title="Insurance & Pricing" description="Accepted insurance plans and transparent pricing at Incapremo Dental Care. We accept most major dental insurance providers." url="/insurance" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Insurance & Pricing</h1>
          <p className={styles.pageSubtitle}>Transparent pricing and most major insurance plans accepted.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Accepted Insurance</h2>
          <p className="section-subtitle">We work with most major dental insurance providers.</p>
          <div className={styles.insuranceGrid}>
            {insurance.map((plan, i) => (
              <motion.div
                key={i}
                className={styles.insuranceCard}
                whileHover={{ y: -2, boxShadow: '0 10px 15px -3px var(--color-shadow)' }}
              >
                <span className={styles.checkmark}>&#10003;</span>
                <span>{plan}</span>
              </motion.div>
            ))}
          </div>
          <div className={styles.note}>
            <p>Don't see your insurance? <a href="tel:+917050576335">Call us</a> — we'll help verify your coverage.</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.pricingSection}`}>
        <div className="container">
          <h2 className="section-title">Pricing Overview</h2>
          <p className="section-subtitle">Estimated costs without insurance. Final costs may vary.</p>
          <div className={styles.pricingTable}>
            <div className={styles.pricingHeader}>
              <span>Service</span>
              <span>Estimated Cost</span>
            </div>
            {pricing.map((item, i) => (
              <div key={i} className={styles.pricingRow}>
                <div>
                  <span className={styles.serviceName}>{item.service}</span>
                  <span className={styles.serviceNote}>{item.note}</span>
                </div>
                <span className={styles.price}>{item.price}</span>
              </div>
            ))}
          </div>
          <div className={styles.financingNote}>
            <p>&#128176; <strong>Flexible Financing Available:</strong> We offer interest-free financing through CareCredit and Lending Club. Ask about our 5% pay-in-full discount!</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container sectionCentered">
          <h2 className="section-title">Questions About Coverage?</h2>
          <p className="section-subtitle">Our team will help you understand your benefits and maximize your insurance.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </>
  );
}

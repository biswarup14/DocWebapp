import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import styles from './Services.module.css';

const specializations = [
  {
    icon: '&#128737;',
    title: 'Preventive Dentistry',
    tagline: 'Keeping little smiles cavity-free.',
    description:
      'Prevention is the foundation of lifelong oral health. We provide dental sealants, professional fluoride treatments, dietary guidance, and tailored oral hygiene instruction to stop cavities before they start — so your child can focus on being a kid.',
    highlights: ['Dental Sealants', 'Fluoride Varnish', 'Oral Hygiene Education', 'Diet & Cavity Counseling'],
  },
  {
    icon: '&#129463;',
    title: 'Pediatric Endodontics',
    tagline: 'Gentle pulp therapy for young teeth.',
    description:
      'When tooth decay reaches the nerve, our gentle pulp therapy and root canal treatments are designed specifically for primary and young permanent teeth. We preserve natural teeth whenever possible, maintaining space and function until the adult teeth are ready to emerge.',
    highlights: ['Pulpotomy', 'Pulpectomy', 'Root Canal (Permanent Teeth)', 'Apexogenesis'],
  },
  {
    icon: '&#128165;',
    title: 'Dental Trauma Management',
    tagline: 'Expert emergency care for accidents.',
    description:
      'Children are active, and dental injuries happen. From chipped and fractured teeth to completely avulsed (knocked-out) teeth, we provide immediate, expert management — splinting, re-implantation, and long-term follow-up to protect the tooth and surrounding bone.',
    highlights: ['Tooth Re-Implantation', 'Splinting & Stabilisation', 'Fracture Repair', 'Long-Term Monitoring'],
  },
  {
    icon: '&#127793;',
    title: 'Space Maintenance & Growth Modification',
    tagline: 'Guiding smiles as they grow.',
    description:
      'Early loss of a baby tooth can cause shifting that leads to crowding and bite problems. We fabricate custom space maintainers to hold open gaps and use growth-guiding appliances to correct developing jaw discrepancies — often avoiding complex treatment later.',
    highlights: ['Custom Space Maintainers', 'Growth-Guiding Appliances', 'Habit Breaking Appliances', 'Interceptive Orthodontics'],
  },
  {
    icon: '&#128156;',
    title: 'Pediatric Periodontics',
    tagline: 'Healthy gums for a healthy smile.',
    description:
      'Gum health is often overlooked in children, yet gingivitis and periodontal issues can begin early. We diagnose and treat soft-tissue conditions in young patients — from routine gingivitis management to care for children with systemic conditions that affect the gums.',
    highlights: ['Gingivitis Treatment', 'Soft-Tissue Management', 'Special-Needs Periodontal Care', 'Oral-Systemic Health Link'],
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Specializations"
        description="Expert pediatric dental specializations at Incapremo Dental Care — Preventive Dentistry, Pediatric Endodontics, Dental Trauma Management, Space Maintenance, and Pediatric Periodontics."
        url="/services"
      />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Our Specializations</h1>
          <p className={styles.pageSubtitle}>
            Specialist pediatric dental care led by Dr. Deepankar Bhattacharya.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {specializations.map((s, i) => (
            <motion.div
              key={i}
              className={styles.specBlock}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className={styles.specHeader}>
                <span className={styles.specIcon} dangerouslySetInnerHTML={{ __html: s.icon }} />
                <div>
                  <h2 className={styles.specTitle}>{s.title}</h2>
                  <p className={styles.specTagline}>{s.tagline}</p>
                </div>
              </div>
              <p className={styles.specDesc}>{s.description}</p>
              <div className={styles.specHighlights}>
                {s.highlights.map((h) => (
                  <span key={h} className={styles.specHighlight}>{h}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Book a Consultation</h2>
            <p>Give your child the specialist care they deserve. Schedule an appointment today.</p>
            <Link to="/appointment" className="btn btn-accent">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import styles from './About.module.css';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5K+', label: 'Patients Treated' },
  { value: '5', label: 'Specializations' },
  { value: '3', label: 'Languages Spoken' },
];

const values = [
  { num: '01', title: 'Patient First', description: 'Every decision we make starts with what is best for the child. Comfort, safety, and trust come before everything else.' },
  { num: '02', title: 'Excellence', description: 'We combine clinical expertise with the latest pediatric dental technology to deliver consistently outstanding outcomes.' },
  { num: '03', title: 'Integrity', description: 'Transparent communication, honest diagnoses, and clear treatment plans — no surprises, no unnecessary procedures.' },
  { num: '04', title: 'Compassion', description: 'We understand dental anxiety in children and create a calm, welcoming environment where every visit feels safe.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Dr. Deepankar Bhattacharya"
        description="Learn about Incapremo Dental Care — specialist pediatric dental practice led by Dr. Deepankar Bhattacharya, a Purulia dentist with 15+ years of experience."
        url="/about"
      />
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.pageSubtitle}>Expert pediatric dental care for your child.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.profileBlock}>
            <div className={styles.profileImage}>
              <img
                src="/oie_Xo2NfYNrbzXd.png"
                alt="Dr. Deepankar Bhattacharya"
                loading="lazy"
              />
            </div>
            <div className={styles.profileContent}>
              <span className={styles.profileBadge}>Meet Your Dentist</span>
              <h2 className={styles.profileName}>Dr. Deepankar Bhattacharya</h2>
              <p className={styles.profileRole}>Associate Professor — Pediatric & Preventive Dentistry</p>
              <p className={styles.profileQual}>B.D.S., M.D.S. (Pediatric Dentistry & Preventive Dentistry)</p>
              <p className={styles.profileBio}>
                Dr. Deepankar Bhattacharya is the founder and lead clinician at Incapremo Dental Care. An Associate Professor in the Department of Pediatric and Preventive Dentistry at Mithila Minority Dental College, he brings a rare combination of academic rigour and hands-on clinical expertise to the practice.
              </p>
              <p className={styles.profileBio}>
                With B.D.S. and M.D.S. qualifications in Pediatric Dentistry, he has published several research articles andspecialises in treating children with complex dental needs, including patients with special health care requirements. His mission is simple: make every visit comfortable, informed, and effective.
              </p>
            
              <p className={styles.profileBio}>
                Fluent in Hindi, English, and Bengali, he connects with families across diverse communities.
              </p>

              <div className={styles.profileSpecs}>
                <span className={styles.profileSpecLabel}>Specializations</span>
                <div className={styles.profileSpecGrid}>
                  {[
                    'Preventive Dentistry',
                    'Pediatric Endodontics',
                    'Dental Trauma Management',
                    'Space Maintenance & Growth Modification',
                    'Pediatric Periodontics',
                  ].map((spec) => (
                    <span key={spec} className={styles.profileSpecItem}>{spec}</span>
                  ))}
                </div>
              </div>

              <div className={styles.profileMeta}>
                <div className={styles.profileMetaBlock}>
                  <span className={styles.profileMetaLabel}>Languages</span>
                  <span className={styles.profileMetaValue}>Hindi · English · Bengali</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.statsSection}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.statCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">The principles that guide every appointment.</p>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className={styles.valueNum}>{v.num}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Book a Consultation</h2>
            <p>Give your child the specialist care they deserve. Schedule an appointment today.</p>
            <Link to="/contact" className="btn btn-accent">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}

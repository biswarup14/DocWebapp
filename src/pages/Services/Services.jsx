import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import PageHeader from '../../components/PageHeader/PageHeader';
import SkeletonImage from '../../components/Skeleton/SkeletonImage';
import styles from './Services.module.css';

const specializations = [
  {
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&h=500&fit=crop&q=80&fm=webp',
    title: 'Preventive Dentistry',
    tagline: 'Keeping little smiles cavity-free.',
    description:
      'Prevention is the foundation of lifelong oral health. We provide dental sealants, professional fluoride treatments, dietary guidance, and tailored oral hygiene instruction to stop cavities before they start — so your child can focus on being a kid.',
    highlights: ['Dental Sealants', 'Fluoride Varnish', 'Oral Hygiene Education', 'Diet & Cavity Counseling'],
  },
  {
    image: '/images_endodontics.jpeg',
    title: 'Pediatric Endodontics',
    tagline: 'Gentle pulp therapy for young teeth.',
    description:
      'When tooth decay reaches the nerve, our gentle pulp therapy and root canal treatments are designed specifically for primary and young permanent teeth. We preserve natural teeth whenever possible, maintaining space and function until the adult teeth are ready to emerge.',
    highlights: ['Pulpotomy', 'Pulpectomy', 'Root Canal (Permanent Teeth)', 'Apexogenesis'],
  },
  {
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&h=500&fit=crop&q=80&fm=webp',
    title: 'Dental Trauma Management',
    tagline: 'Expert emergency care for accidents.',
    description:
      'Children are active, and dental injuries happen. From chipped and fractured teeth to completely avulsed (knocked-out) teeth, we provide immediate, expert management — splinting, re-implantation, and long-term follow-up to protect the tooth and surrounding bone.',
    highlights: ['Tooth Re-Implantation', 'Splinting & Stabilisation', 'Fracture Repair', 'Long-Term Monitoring'],
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop&q=80&fm=webp',
    title: 'Space Maintenance & Growth Modification',
    tagline: 'Guiding smiles as they grow.',
    description:
      'Early loss of a baby tooth can cause shifting that leads to crowding and bite problems. We fabricate custom space maintainers to hold open gaps and use growth-guiding appliances to correct developing jaw discrepancies — often avoiding complex treatment later.',
    highlights: ['Custom Space Maintainers', 'Growth-Guiding Appliances', 'Habit Breaking Appliances', 'Interceptive Orthodontics'],
  },
  {
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=500&fit=crop&q=80&fm=webp',
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
        description="Expert pediatric dental specializations at Incapremo Dental Care — Preventive Dentistry, Pediatric Endodontics, Dental Trauma Management, Space Maintenance, and Pediatric Periodontics by Dr. Deepankar Bhattacharya."
        url="/services"
      />
      <PageHeader
        title="Our Specializations"
        subtitle="Specialist pediatric dental care led by Dr. Deepankar Bhattacharya."
      />

      <section className="section">
        <div className="container">
          {specializations.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`${styles.specBlock} ${isEven ? styles.specRow : styles.specRowReverse}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className={styles.specImage}>
                  <SkeletonImage src={s.image} alt={s.title} />
                </div>
                <div className={styles.specContent}>
                  <span className={styles.specNumber}>0{i + 1}</span>
                  <h2 className={styles.specTitle}>{s.title}</h2>
                  <p className={styles.specTagline}>{s.tagline}</p>
                  <p className={styles.specDesc}>{s.description}</p>
                  <div className={styles.specHighlights}>
                    {s.highlights.map((h) => (
                      <span key={h} className={styles.specHighlight}>{h}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Book a Consultation</h2>
            <p>Give your child the specialist care they deserve. Schedule an appointment today.</p>
            <Link to="/contact" className="btn btn-accent">Book Now</Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

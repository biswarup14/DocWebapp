import SEO from '../../components/SEO/SEO';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import styles from './Services.module.css';

const services = [
  { icon: '&#129463;', title: 'General Checkup', description: 'Comprehensive oral examinations including X-rays, cancer screening, and personalized treatment plans.' },
  { icon: '&#129523;', title: 'Professional Cleaning', description: 'Deep cleaning and polishing to remove plaque and tartar buildup, preventing gum disease.' },
  { icon: '&#9728;', title: 'Teeth Whitening', description: 'Professional-grade whitening treatments that can brighten your smile up to 8 shades.' },
  { icon: '&#128296;', title: 'Dental Implants', description: 'Permanent, natural-looking tooth replacements anchored directly into the jawbone.' },
  { icon: '&#128171;', title: 'Orthodontics', description: 'Traditional braces and clear aligners to straighten teeth and correct bite alignment.' },
  { icon: '&#10024;', title: 'Veneers', description: 'Custom porcelain shells bonded to teeth for a flawless, natural-looking smile.' },
  { icon: '&#129657;', title: 'Root Canal Therapy', description: 'Pain-free root canal treatments to save infected teeth and relieve discomfort.' },
  { icon: '&#128081;', title: 'Crowns & Bridges', description: 'Custom restorations to repair damaged teeth or replace missing ones.' },
  { icon: '&#129463;', title: 'Gum Disease Treatment', description: 'Scaling, root planing, and surgical treatments for healthy gums.' },
  { icon: '&#128247;', title: 'Pediatric Dentistry', description: 'Gentle, fun dental care specifically designed for children of all ages.' },
  { icon: '&#128680;', title: 'Emergency Dental Care', description: 'Same-day appointments for dental emergencies including severe pain, broken teeth, and more.' },
  { icon: '&#128196;', title: 'Oral Surgery', description: 'Wisdom tooth extraction, bone grafting, and other surgical procedures.' },
];

export default function Services() {
  return (
    <>
      <SEO title="Services" description="Comprehensive dental services including general dentistry, teeth whitening, implants, orthodontics, and emergency care." url="/services" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Our Services</h1>
          <p className={styles.pageSubtitle}>Comprehensive dental care for every member of your family.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

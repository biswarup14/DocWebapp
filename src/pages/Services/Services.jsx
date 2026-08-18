import SEO from '../../components/SEO/SEO';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import styles from './Services.module.css';

const services = [
  { image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop', title: 'General Checkup', description: 'Comprehensive oral examinations including X-rays, cancer screening, and personalized treatment plans.' },
  { image: 'https://images.unsplash.com/photo-1663755489920-5e09f66d011a?w=600&h=400&fit=crop', title: 'Professional Cleaning', description: 'Deep cleaning and polishing to remove plaque and tartar buildup, preventing gum disease.' },
  { image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop', title: 'Teeth Whitening', description: 'Professional-grade whitening treatments that can brighten your smile up to 8 shades.' },
  { image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop', title: 'Dental Implants', description: 'Permanent, natural-looking tooth replacements anchored directly into the jawbone.' },
  { image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop', title: 'Orthodontics', description: 'Traditional braces and clear aligners to straighten teeth and correct bite alignment.' },
  { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop', title: 'Veneers', description: 'Custom porcelain shells bonded to teeth for a flawless, natural-looking smile.' },
  { image: 'https://images.unsplash.com/photo-1657470179447-0f5aa16daa91?w=600&h=400&fit=crop', title: 'Root Canal Therapy', description: 'Pain-free root canal treatments to save infected teeth and relieve discomfort.' },
  { image: 'https://images.unsplash.com/photo-1667133295315-820bb6481730?w=600&h=400&fit=crop', title: 'Crowns & Bridges', description: 'Custom restorations to repair damaged teeth or replace missing ones.' },
  { image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop', title: 'Gum Disease Treatment', description: 'Scaling, root planing, and surgical treatments for healthy gums.' },
  { image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', title: 'Pediatric Dentistry', description: 'Gentle, fun dental care specifically designed for children of all ages.' },
  { image: 'https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=600&h=400&fit=crop', title: 'Emergency Dental Care', description: 'Same-day appointments for dental emergencies including severe pain, broken teeth, and more.' },
  { image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop', title: 'Oral Surgery', description: 'Wisdom tooth extraction, bone grafting, and other surgical procedures.' },
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

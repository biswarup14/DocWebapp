import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import LiveClock from '../../components/LiveClock/LiveClock';
import styles from './Home.module.css';

const specializations = [
  { image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Preventive Dentistry', desc: 'Sealants, fluoride treatments & cavity prevention for children.' },
  { image: '/images_endodontics.jpeg', title: 'Pediatric Endodontics', desc: 'Pulp therapy & root canals for primary and young permanent teeth.' },
  { image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Dental Trauma Management', desc: 'Expert emergency care for broken, knocked-out or displaced teeth.' },
  { image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Space Maintenance & Growth Modification', desc: 'Appliances to guide proper alignment of developing teeth.' },
  { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&q=80&fm=webp', title: 'Pediatric Periodontics', desc: 'Diagnosis and treatment of gum conditions in children.' },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Incapremo Dental Care — best dentist near me in Purulia. Dr. Deepankar Bhattacharya offers pediatric dental care, emergency dentist services, and more. Book your appointment today."
        url="/"
      />

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
              Specialist pediatric dental care in a comfortable, modern environment. Expert treatment for children and adults of all ages.
            </p>
            <p className={styles.doctorName}>Led by <strong>Dr. Deepankar Bhattacharya</strong></p>
            <div className={styles.heroActions}>
              <Link to="/contact" className="btn btn-primary">Book Appointment</Link>
              <Link to="/services" className="btn btn-secondary">Our Specializations</Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <strong>15+</strong>
                <span>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <strong>5K+</strong>
                <span>Happy Patients</span>
              </div>
              <div className={styles.stat}>
                <strong>4.9</strong>
                <span>Star Rating</span>
              </div>
            </div>
          </motion.div>
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
                  <img src={s.image} alt={s.title} loading="lazy" />
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

      <section className={`section ${styles.aboutSeoSection}`}>
        <div className="container">
          <div className={styles.aboutSeoContent}>
            <h2 className="section-title">Incapremo Dental Care — Your Trusted Dentist Near Me in Purulia</h2>

            <p>
              When searching for a <strong>dentist near me</strong> or the <strong>best dentist near me</strong> in Purulia, West Bengal, families consistently turn to <strong>Incapremo Dental Care</strong> led by <strong>Dr. Deepankar Bhattacharya</strong>. With over 15 years of experience, 5,000+ happy patients, and a 4.9-star rating, Incapremo Dental Care has established itself as the leading <strong>pediatric dentist near me</strong> and family dental practice in the Purulia region. Whether you need a routine check-up, advanced pediatric treatment, or an <strong>emergency dentist near me</strong>, our clinic is here to serve you with compassion, expertise, and modern technology.
            </p>

            <h3>Why Families Choose Dr. Deepankar Bhattacharya as Their Child Dentist Near Me</h3>
            <p>
              Dr. Deepankar Bhattacharya is not just any <strong>purulia dentist doctor</strong> — he is a specialist in Pediatric and Preventive Dentistry with B.D.S. and M.D.S. qualifications. As an Associate Professor in the Department of Pediatric and Preventive Dentistry at Mithila Minority Dental College, he combines academic rigour with hands-on clinical expertise that few <strong>kolkata dentist</strong> professionals can match. Parents searching for a <strong>good dentist near me</strong> or a <strong>child dentist near me</strong> will find that Dr. Bhattacharya brings a rare combination of advanced training, published research, and genuine compassion for young patients. He understands that a child's first dental experiences shape their attitude toward oral health for life, which is why every visit is designed to be comfortable, informed, and effective.
            </p>

            <h3>Comprehensive Dental Services at Incapremo Dental Care</h3>
            <p>
              As a top-rated <strong>dentist near me within 400m</strong> of central Purulia on Deshbandhu Road, Incapremo Dental Care offers a full spectrum of dental services for patients of all ages. Our five core specializations include Preventive Dentistry with sealants and fluoride treatments, Pediatric Endodontics for gentle pulp therapy and root canals, Dental Trauma Management for emergency care of broken or knocked-out teeth, Space Maintenance and Growth Modification using custom appliances, and Pediatric Periodontics for gum health in children. Each treatment is delivered using the latest dental technology in a calm, modern clinical environment.
            </p>

            <h3>Emergency Dentist Near Me — Same-Day Appointments When You Need Them Most</h3>
            <p>
              Dental emergencies do not follow a schedule. That is why Incapremo Dental Care provides same-day <strong>emergency dentist</strong> services for families in Purulia and surrounding areas. Whether your child has a severe toothache, a knocked-out tooth from a sports injury, a cracked or broken tooth, or a painful abscess, our team is ready to help. Call us at (+91) 7050576335 for immediate guidance. We also have an alternate emergency contact at (+91) 9334335872 for after-hours situations. When you search for an <strong>emergency dentist near me</strong>, you want a clinic that responds quickly and treats every case with urgency — that is exactly what we deliver at Incapremo Dental Care.
            </p>

            <h3>What Makes Us the Best Dentist Near Me in Purulia</h3>
            <p>
              Choosing the <strong>best dentist near me</strong> is about more than proximity. It is about trust, skill, and outcomes. At Incapremo Dental Care, Dr. Deepankar Bhattacharya has treated over 5,000 patients across Purulia, Kolkata, and surrounding communities. His specializations in pediatric endodontics, dental trauma management, and interceptive orthodontics mean your child receives care from a true specialist, not a generalist. Families who have searched for a <strong>good dentist near me</strong> and visited our clinic consistently leave five-star reviews on Google, praising our gentle approach, transparent communication, and modern facilities. Our clinic is conveniently located on Deshbandhu Road, behind Reliance Digital, making us one of the most accessible dental practices in the city — truly a <strong>dentist near me within 400m</strong> of the heart of Purulia.
            </p>

            <h3>Serving Purulia, Kolkata, and Beyond</h3>
            <p>
              While we are proudly rooted in Purulia, families travel from across West Bengal to see Dr. Deepankar Bhattacharya. Whether you are looking for a <strong>kolkata dentist</strong> for specialized pediatric care or need a reliable <strong>purulia dentist doctor</strong> for your family, Incapremo Dental Care is the answer. We speak Hindi, English, and Bengali, ensuring that we connect with families from diverse communities. Our clinic hours — Monday through Saturday from 10 AM to 2 PM and 5 PM to 8 PM — are designed to accommodate working parents and school schedules. Visit us at Deshbandhu Road, behind Reliance Digital, Purulia, West Bengal 723101, or call (+91) 7050576335 to book your appointment today.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
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
          </div>
        </div>
      </section>
    </>
  );
}

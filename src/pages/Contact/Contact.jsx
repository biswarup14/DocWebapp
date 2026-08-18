import SEO from '../../components/SEO/SEO';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './Contact.module.css';

const contactInfo = [
  { icon: '&#128205;', label: 'Address', value: 'Behind Reliance Digital, Deshbandhu Road, Badulia, Bardhaman-713101, West Bengal' },
  { icon: '&#128222;', label: 'Phone', value: '(+91) 7050576335', href: 'tel:+917050576335' },
  { icon: '&#128231;', label: 'Email', value: 'dr.deepankarbhattacharya@gmail.com', href: 'mailto:dr.deepankarbhattacharya@gmail.com' },
  { icon: '&#128336;', label: 'Hours', value: 'Mon-Fri: 8am-6pm | Sat: 9am-2pm' },
];

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Incapremo Dental Care. Call us, email us, or fill out our contact form. We're here to help!" url="/contact" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.pageSubtitle}>We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            <div>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              <ContactForm />
            </div>
            <div className={styles.infoSide}>
              <h2 className={styles.infoTitle}>Get in Touch</h2>
              <div className={styles.infoCards}>
                {contactInfo.map((info, i) => (
                  <div key={i} className={styles.infoCard}>
                    <span className={styles.infoIcon} dangerouslySetInnerHTML={{ __html: info.icon }} />
                    <div>
                      <p className={styles.infoLabel}>{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className={styles.infoValue}>{info.value}</a>
                      ) : (
                        <p className={styles.infoValue}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.mapContainer}>
                <h3>Find Us</h3>
                <div className={styles.mapFrame}>
                  <iframe
                    title="Incapremo Dental Care Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1234567890123!2d87.88!3d23.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzAwLjAiTiA4N8KwNTInNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=Behind+Reliance+Digital,+Deshbandhu+Road,+Badulia,+Bardhaman,+West+Bengal+713101"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reviewCta}>
        <div className="container">
          <div className={styles.reviewCtaBox}>
            <h2>Loved Your Visit?</h2>
            <p>Your feedback helps us grow and helps other families find quality dental care. Share your experience on Google!</p>
            <a
              href="https://maps.app.goo.gl/p3BLPCVnkG4gG2HB6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ backgroundColor: 'white', color: 'var(--color-primary)', fontWeight: 700 }}
            >
              Leave Us a Google Review &#9733;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

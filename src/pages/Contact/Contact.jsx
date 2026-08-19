import SEO from '../../components/SEO/SEO';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './Contact.module.css';

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Deshbandhu Rd, behind Reliance Digital, Purulia, West Bengal 723101' },
  { icon: '📞', label: 'Phone', value: '(+91) 7050576335', href: 'tel:+917050576335' },
  { icon: '✉️', label: 'Email', value: 'dr.deepankarbhattacharya@gmail.com', href: 'mailto:dr.deepankarbhattacharya@gmail.com' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 10AM–2PM, 5PM–8PM' },
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Incapremo Dental Care — your trusted dentist near me in Purulia. Call (+91) 7050576335 or fill out our contact form."
        url="/contact"
      />
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
                    <span className={styles.infoIcon}>{info.icon}</span>
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
                    src="https://maps.google.com/maps?q=Deshbandhu+Rd,+behind+Reliance+Digital,+Purulia,+West+Bengal+723101&t=&z=17&ie=UTF8&iwloc=&output=embed"
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

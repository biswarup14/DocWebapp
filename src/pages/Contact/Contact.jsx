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
                <div className={styles.mapPlaceholder}>
                  <span>&#128506;</span>
                  <p>Google Maps - Behind Reliance Digital, Deshbandhu Road, Badulia, Bardhaman-713101, West Bengal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

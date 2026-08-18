import { Link } from 'react-router-dom';
import SocialLinks from '../SocialLinks/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <Link to="/" className={styles.footerLogo}>
            <span>&#129463;</span> Bright Smile Dental
          </Link>
          <p className={styles.footerDesc}>
            Professional dental care for the whole family. Creating brighter smiles since 2005.
          </p>
          <SocialLinks />
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Services</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/services">General Dentistry</Link></li>
            <li><Link to="/services">Teeth Whitening</Link></li>
            <li><Link to="/services">Dental Implants</Link></li>
            <li><Link to="/services">Orthodontics</Link></li>
            <li><Link to="/insurance">Insurance & Pricing</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Contact</h4>
          <ul className={styles.footerLinks}>
            <li>123 Dental Ave, Smileville, CA 90210</li>
            <li><a href="tel:+15551234567">(555) 123-4567</a></li>
            <li><a href="mailto:info@brightsmiledental.com">info@brightsmiledental.com</a></li>
            <li>Mon-Fri: 8am - 6pm</li>
            <li>Saturday: 9am - 2pm</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; {new Date().getFullYear()} Bright Smile Dental. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <Link to="/emergency">Emergency Contact</Link>
          <Link to="/admin" className={styles.adminLink}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}

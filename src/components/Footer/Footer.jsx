import { Link } from 'react-router-dom';
import SocialLinks from '../SocialLinks/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <Link to="/" className={styles.footerLogo}>
            <img src="/logo.png" alt="Incapremo Dental Care" className={styles.footerLogoIcon} />
          </Link>
          <p className={styles.footerDesc}>
            Your dentist near me in Purulia and Kolkata for pediatric, family and emergency dental
            care. Led by Dr. Deepankar Bhattacharya, B.D.S., M.D.S.
          </p>
          <SocialLinks />
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Dentist Near Me in Purulia</Link></li>
            <li><Link to="/services">Dental Treatment in Purulia &amp; Kolkata</Link></li>
            <li><Link to="/about">Kids Dentist &mdash; Dr. Bhattacharya</Link></li>
            <li><Link to="/proof-of-work">Dental Results</Link></li>
            <li><Link to="/contact">Contact the Clinic</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Treatments</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/services">Pediatric Dentist Near Me</Link></li>
            <li><Link to="/services">Preventive Dentistry</Link></li>
            <li><Link to="/services">Root Canal Treatment</Link></li>
            <li><Link to="/services">Orthodontics in Kolkata</Link></li>
            <li><Link to="/emergency">Emergency Dentist</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Visit &amp; Contact</h4>
          <ul className={styles.footerLinks}>
            <li>Deshbandhu Rd, behind Reliance Digital, Purulia, West Bengal 723101</li>
            <li><a href="tel:+917050576335">(+91) 7050576335</a></li>
            <li><a href="mailto:dr.deepankarbhattacharya@gmail.com">dr.deepankarbhattacharya@gmail.com</a></li>
            <li>Mon&ndash;Sat: 10 AM&ndash;2 PM, 5 PM&ndash;8 PM</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; {new Date().getFullYear()} Incapremo Dental Care. All rights reserved. Made by <a href="https://www.linkedin.com/in/biswarup-bhattacharjee-2a836019a/" target="_blank" rel="noopener noreferrer" className={styles.madeBy}>Biswarup</a></p>
        <div className={styles.footerBottomLinks}>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/emergency">Emergency Contact</Link>
        </div>
      </div>
    </footer>
  );
}

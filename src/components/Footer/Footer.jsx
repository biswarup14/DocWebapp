import { Link } from 'react-router-dom';
import SocialLinks from '../SocialLinks/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <Link to="/" className={styles.footerLogo}>
            <span>&#129463;</span> Incapremo Dental Care
          </Link>
          <p className={styles.footerDesc}>
            Professional dental care for the whole family. <div className=""></div>Creating brighter smiles.
          </p>
          <SocialLinks />
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
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
            <li>Behind Reliance Digital, Deshbandhu Road, Badulia, Bardhaman-713101, West Bengal</li>
            <li><a href="tel:+917050576335">(+91) 7050576335</a></li>
            <li><a href="mailto:dr.deepankarbhattacharya@gmail.com">dr.deepankarbhattacharya@gmail.com</a></li>
            <li>Mon-Fri: 8am - 6pm</li>
            <li>Saturday: 9am - 2pm</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; {new Date().getFullYear()} Incapremo Dental Care. All rights reserved. Made by <a href="https://www.linkedin.com/in/biswarup-bhattacharjee-2a836019a/" target="_blank" rel="noopener noreferrer" className={styles.madeBy}>Biswarup</a></p>
        <div className={styles.footerBottomLinks}>
          <Link to="/emergency">Emergency Contact</Link>
        </div>
      </div>
    </footer>
  );
}

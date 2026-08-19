import SEO from '../../components/SEO/SEO';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Incapremo Dental Care. Learn how we collect, use, and protect your personal information."
        url="/privacy-policy"
        noindex
      />
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.pageSubtitle}>Last updated: August 19, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <h2>1. Information We Collect</h2>
            <p>
              At Incapremo Dental Care, we collect information you provide directly to us, such as when you book an appointment, fill out a contact form, or communicate with us. This may include your name, email address, phone number, child&apos;s name, and medical history relevant to dental treatment.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Schedule and manage dental appointments</li>
              <li>Provide pediatric dental care and treatment</li>
              <li>Communicate with you about your child&apos;s dental health</li>
              <li>Send appointment reminders and follow-up care instructions</li>
              <li>Respond to your inquiries and requests</li>
              <li>Improve our services and patient experience</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our practice, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessed by authorized personnel who need it to perform their duties in providing dental care services.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though some features of the site may not function properly as a result.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              As a pediatric dental practice, we take children&apos;s privacy seriously. We do not knowingly collect personal information from children under 13 without parental consent. All patient records are maintained in compliance with applicable healthcare privacy regulations.
            </p>

            <h2>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of non-essential communications</li>
            </ul>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:dr.deepankarbhattacharya@gmail.com">dr.deepankarbhattacharya@gmail.com</a>{' '}
              or call <a href="tel:+917050576335">(+91) 7050576335</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

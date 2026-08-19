import SEO from '../../components/SEO/SEO';
import styles from './TermsAndConditions.module.css';

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for Incapremo Dental Care. Read the terms governing the use of our services and website."
        url="/terms-and-conditions"
        noindex
      />
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Terms & Conditions</h1>
          <p className={styles.pageSubtitle}>Last updated: August 19, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services of Incapremo Dental Care, including our website and dental care services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>

            <h2>2. Dental Services</h2>
            <p>
              Incapremo Dental Care provides pediatric dental care services. All treatments are provided by qualified dental professionals led by Dr. Deepankar Bhattacharya. Treatment plans and diagnoses are based on professional clinical judgment and the individual needs of each patient.
            </p>

            <h2>3. Appointment Policy</h2>
            <ul>
              <li>Appointments can be scheduled via phone, in-person, or through our website contact form</li>
              <li>Please arrive at least 10 minutes before your scheduled appointment</li>
              <li>If you need to cancel or reschedule, we request at least 24 hours&apos; notice</li>
              <li>Repeated no-shows may result in changes to scheduling privileges</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>
              Payment is due at the time of service unless otherwise arranged. We accept various payment methods as communicated during your visit. Any outstanding balance must be cleared before subsequent treatments.
            </p>

            <h2>5. Patient Responsibilities</h2>
            <p>As a patient or guardian, you agree to:</p>
            <ul>
              <li>Provide accurate and complete health information</li>
              <li>Follow prescribed treatment plans and care instructions</li>
              <li>Inform us of any changes in health status or medications</li>
              <li>Treat staff and other patients with respect</li>
            </ul>

            <h2>6. Website Usage</h2>
            <p>
              The content on this website is provided for general information purposes only. It is not intended as a substitute for professional dental advice, diagnosis, or treatment. Always consult with our qualified dental professionals for specific dental concerns.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and design elements, is the property of Incapremo Dental Care and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is prohibited.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              Incapremo Dental Care shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our liability is limited to the extent permitted by applicable law.
            </p>

            <h2>9. Privacy</h2>
            <p>
              Your use of our services is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which describes how we collect, use, and protect your personal information.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Continued use of our services after changes constitutes acceptance of the revised terms.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              For any questions regarding these Terms and Conditions, please contact us at{' '}
              <a href="mailto:dr.deepankarbhattacharya@gmail.com">dr.deepankarbhattacharya@gmail.com</a>{' '}
              or call <a href="tel:+917050576335">(+91) 7050576335</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

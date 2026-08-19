import { useState } from 'react';
import { trackEvent } from '../../utils/analytics';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent('Contact', 'form_submit', form.subject);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <span className={styles.successIcon}>&#10003;</span>
        <h3>Message Sent!</h3>
        <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" required value={form.subject} onChange={handleChange}>
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="appointment">Appointment Question</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          placeholder="How can we help you?"
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
}

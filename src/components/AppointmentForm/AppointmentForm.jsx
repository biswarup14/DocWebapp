import { useState, useContext } from 'react';
import { AppointmentContext } from '../../context/AppointmentContext';
import { trackEvent } from '../../utils/analytics';
import styles from './AppointmentForm.module.css';

const services = [
  'General Checkup',
  'Teeth Cleaning',
  'Teeth Whitening',
  'Dental Filling',
  'Root Canal',
  'Dental Implant',
  'Crown & Bridge',
  'Orthodontics Consultation',
  'Emergency',
];

export default function AppointmentForm() {
  const { bookAppointment } = useContext(AppointmentContext);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', time: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookAppointment(form);
    trackEvent('Appointment', 'book', form.service);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>&#10003;</span>
        <h3>Appointment Booked!</h3>
        <p>We've received your appointment request. We'll confirm your booking shortly via email.</p>
        <p className={styles.details}>
          <strong>Service:</strong> {form.service}<br />
          <strong>Date:</strong> {form.date}<br />
          <strong>Time:</strong> {form.time}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" required placeholder="John Doe" value={form.name} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="john@example.com" value={form.email} onChange={handleChange} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required placeholder="(555) 000-0000" value={form.phone} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="service">Service</label>
          <select id="service" name="service" required value={form.service} onChange={handleChange}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="date">Preferred Date</label>
          <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="time">Preferred Time</label>
          <select id="time" name="time" required value={form.time} onChange={handleChange}>
            <option value="">Select a time</option>
            <option value="08:00">8:00 AM</option>
            <option value="08:30">8:30 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="09:30">9:30 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="10:30">10:30 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="11:30">11:30 AM</option>
            <option value="13:00">1:00 PM</option>
            <option value="13:30">1:30 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="14:30">2:30 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="15:30">3:30 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="16:30">4:30 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="notes">Additional Notes</label>
        <textarea id="notes" name="notes" rows="3" placeholder="Any special requirements or concerns?" value={form.notes} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">
        Book Appointment
      </button>
    </form>
  );
}

import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialContext } from '../../context/TestimonialContext';
import { trackEvent } from '../../utils/analytics';
import styles from './AddTestimonial.module.css';

const MAX_WORDS = 200;

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function AddTestimonial() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', text: '', rating: 5 });
  const [errors, setErrors] = useState({});
  const { addTestimonial } = useContext(TestimonialContext);

  const wordCount = countWords(form.text);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.text.trim()) errs.text = 'Please share your experience';
    if (wordCount > MAX_WORDS) errs.text = `Maximum ${MAX_WORDS} words allowed`;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'text' && countWords(value) > MAX_WORDS + 10) return;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleRating = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addTestimonial(form);
    trackEvent('Testimonial', 'submit', form.name);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setForm({ name: '', phone: '', text: '', rating: 5 });
    setErrors({});
  };

  return (
    <>
      <button className={styles.triggerBtn} onClick={() => setIsOpen(true)}>
        &#10010; Share Your Experience
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={handleClose}>&#10005;</button>

              {submitted ? (
                <div className={styles.success}>
                  <span className={styles.successIcon}>&#10003;</span>
                  <h3>Thank You!</h3>
                  <p>Your testimonial has been submitted successfully.</p>
                  <button className="btn btn-primary" onClick={handleClose}>Close</button>
                </div>
              ) : (
                <>
                  <h2 className={styles.modalTitle}>Share Your Experience</h2>
                  <p className={styles.modalSubtitle}>We'd love to hear about your visit!</p>

                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                      <label htmlFor="t-name">Your Name</label>
                      <input
                        id="t-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="t-phone">Phone Number</label>
                      <input
                        id="t-phone"
                        name="phone"
                        type="tel"
                        placeholder="(+91) 7050576335"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                    </div>

                    <div className={styles.field}>
                      <label>Rating</label>
                      <div className={styles.ratingPicker}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`${styles.star} ${star <= form.rating ? styles.starActive : ''}`}
                            onClick={() => handleRating(star)}
                          >
                            &#9733;
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="t-text">Your Experience</label>
                      <textarea
                        id="t-text"
                        name="text"
                        rows="5"
                        placeholder="Tell us about your experience at Incapremo Dental Care..."
                        value={form.text}
                        onChange={handleChange}
                      />
                      <div className={styles.wordCount}>
                        <span className={wordCount > MAX_WORDS ? styles.wordCountOver : ''}>
                          {wordCount}/{MAX_WORDS} words
                        </span>
                      </div>
                      {errors.text && <span className={styles.error}>{errors.text}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Submit Testimonial
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

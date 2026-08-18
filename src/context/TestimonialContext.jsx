import { createContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'brightsmile_testimonials';

const defaultTestimonials = [
  { id: 1, name: 'Emily Rodriguez', phone: '555-0101', rating: 5, text: 'Best dental experience ever! The staff is incredibly friendly and the office is spotless. Dr. Bhattacharya made my teeth whitening results amazing.', date: 'February 2025' },
  { id: 2, name: 'Michael Chen', phone: '555-0102', rating: 5, text: 'I was terrified of dentists until I came here. They made me feel completely at ease during my implant procedure. Highly recommend!', date: 'January 2025' },
  { id: 3, name: 'Sarah Johnson', phone: '555-0103', rating: 5, text: 'My kids actually look forward to their dental visits now. The pediatric care here is outstanding. Thank you, Dr. Bhattacharya!', date: 'March 2025' },
  { id: 4, name: 'David Kim', phone: '555-0104', rating: 5, text: 'The Invisalign treatment was seamless. Dr. Bhattacharya monitored every step and the results exceeded my expectations. My teeth are perfectly aligned now.', date: 'December 2024' },
  { id: 5, name: 'Jennifer Lopez', phone: '555-0105', rating: 4, text: 'Great experience with my crown restoration. The whole process was explained clearly and the final result looks completely natural.', date: 'November 2024' },
  { id: 6, name: 'Robert Wilson', phone: '555-0106', rating: 5, text: 'Had a dental emergency on a Saturday. They got me in immediately and took care of the problem. Lifesavers!', date: 'October 2024' },
  { id: 7, name: 'Amanda Foster', phone: '555-0107', rating: 5, text: 'The veneers transformed my smile completely. I finally feel confident in photos. The team here is truly exceptional.', date: 'September 2024' },
  { id: 8, name: 'Carlos Mendez', phone: '555-0108', rating: 5, text: 'Professional, clean, and caring. Every visit has been outstanding. This is the only dental practice I trust with my family.', date: 'August 2024' },
  { id: 9, name: 'Lisa Taylor', phone: '555-0109', rating: 4, text: 'Quick, painless, and thorough. The hygienist is fantastic at explaining everything during cleaning. Very happy patient!', date: 'July 2024' },
];

function loadTestimonials() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
}

export const TestimonialContext = createContext();

export function TestimonialProvider({ children }) {
  const [testimonials, setTestimonials] = useState(loadTestimonials);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
  }, [testimonials]);

  const addTestimonial = ({ name, phone, text, rating = 5 }) => {
    const newTestimonial = {
      id: Date.now(),
      name,
      phone,
      text,
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
    return newTestimonial;
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, addTestimonial, deleteTestimonial }}>
      {children}
    </TestimonialContext.Provider>
  );
}

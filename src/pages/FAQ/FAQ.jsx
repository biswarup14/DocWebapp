import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO/SEO';
import FAQItem from '../../components/FAQItem/FAQItem';
import styles from './FAQ.module.css';

const faqs = [
  { question: 'How often should I visit the dentist?', answer: 'We recommend visiting the dentist every six months for a routine checkup and professional cleaning. However, some patients may need more frequent visits depending on their oral health needs.' },
  { question: 'Does dental treatment hurt?', answer: 'Modern dentistry has come a long way in pain management. We use topical numbing agents and local anesthesia to ensure your comfort. Most patients report minimal discomfort during procedures.' },
  { question: 'What insurance do you accept?', answer: 'We accept most major dental insurance plans including Delta Dental, Cigna, MetLife, Aetna, and Blue Cross Blue Shield. Contact our office to verify your specific coverage.' },
  { question: 'How much does teeth whitening cost?', answer: 'Professional teeth whitening at our office starts at $299. The exact cost depends on the treatment option you choose. We also offer financing plans to make it affordable.' },
  { question: 'What should I do in a dental emergency?', answer: 'Call our office immediately at (+91) 7050576335. For after-hours emergencies, our answering service will connect you with an on-call dentist. Common emergencies include severe toothache, knocked-out teeth, and broken restorations.' },
  { question: 'Are dental X-rays safe?', answer: 'Yes, dental X-rays are very safe. We use digital X-rays which emit up to 80% less radiation than traditional film X-rays. The diagnostic benefits far outweigh the minimal risk.' },
  { question: 'How long do dental implants last?', answer: 'With proper care, dental implants can last a lifetime. The crown on top may need replacement after 10-15 years due to normal wear. Good oral hygiene and regular checkups are key to implant longevity.' },
  { question: 'Do you offer payment plans?', answer: 'Yes, we offer flexible payment options including interest-free financing through CareCredit and Lending Club. We also accept most major credit cards and offer a 5% discount for paying in full.' },
  { question: 'At what age should my child first see a dentist?', answer: 'The American Academy of Pediatric Dentistry recommends a child\'s first dental visit by their first birthday or within six months of the first tooth erupting. Early visits help establish good oral habits.' },
  { question: 'What is Invisalign and how does it work?', answer: 'Invisalign uses a series of clear, removable aligners to gradually straighten teeth. Each set of aligners is worn for about two weeks before moving to the next. Treatment typically takes 12-18 months.' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about dental services, insurance, pricing, and patient care at Incapremo Dental Care." url="/faq" schema={false} />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>Find answers to common questions about our dental services.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
          <div className={styles.cta}>
            <p>Don't see your question here?</p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: 'How to remove plaque from teeth?',
    answer: 'Plaque can be effectively removed by brushing your teeth twice daily with a fluoride toothpaste, flossing regularly, and visiting your dentist for professional cleanings. Use a soft-bristled toothbrush and brush in gentle circular motions along the gumline. Rinsing with an antimicrobial mouthwash can also help reduce plaque buildup between brushing sessions.',
  },
  {
    question: 'Which toothpaste is best for teeth?',
    answer: 'The best toothpaste depends on your specific dental needs. For general use, choose a fluoride toothpaste approved by dental associations. For sensitive teeth, look for toothpastes containing potassium nitrate or stannous fluoride. For cavity prevention, fluoride-based toothpastes are highly recommended. Consult Dr. Deepankar Bhattacharya at Incapremo Dental Care for personalized toothpaste recommendations.',
  },
  {
    question: 'How to remove yellow stains from teeth?',
    answer: 'Yellow stains can be caused by food, beverages, smoking, or aging. Professional teeth whitening treatments are the most effective solution. At-home options include whitening toothpastes and over-the-counter whitening strips. For stubborn stains, professional dental cleaning and scaling can significantly improve tooth appearance. Avoid excessive consumption of tea, coffee, and tobacco products to prevent further staining.',
  },
  {
    question: 'How to cure gum problems?',
    answer: 'Gum problems like gingivitis can be managed with proper oral hygiene — brushing twice daily, flossing, and using antibacterial mouthwash. For advanced gum disease (periodontitis), professional treatment such as scaling and root planing may be required. Regular dental check-ups at Incapremo Dental Care can help detect and treat gum issues early. Maintain a balanced diet and avoid smoking for healthier gums.',
  },
  {
    question: 'What is endodontics?',
    answer: 'Endodontics is a specialized branch of dentistry focused on the diagnosis and treatment of issues related to the dental pulp and tissues surrounding the roots of teeth. The most common endodontic treatment is root canal therapy, which involves removing infected or damaged pulp tissue, cleaning and shaping the root canal, and sealing it to prevent further infection. Dr. Deepankar Bhattacharya is skilled in pediatric endodontic procedures.',
  },
  {
    question: 'When to start brushing after tooth extraction?',
    answer: 'You should wait at least 24 hours after a tooth extraction before gently brushing the extraction site. During the first 24 hours, avoid rinsing, spitting forcefully, or using a straw, as these actions can dislodge the blood clot and delay healing. After 24 hours, brush gently around the extraction site while avoiding direct contact. Rinse gently with warm salt water to keep the area clean. Follow your dentist\'s specific post-extraction care instructions.',
  },
  {
    question: 'Dr. Deepankar Bhattacharya dentist?',
    answer: 'Dr. Deepankar Bhattacharya is a highly experienced pediatric dentist at Incapremo Dental Care in West Bengal. With B.D.S. and M.D.S. qualifications and over 15 years of experience, he specializes in pediatric dentistry, endodontics, dental trauma management, and preventive dentistry. He is known for providing gentle, child-friendly dental care in a comfortable environment.',
  },
  {
    question: 'Incapremo Dental Care West Bengal?',
    answer: 'Incapremo Dental Care is a leading dental clinic located on Deshbandhu Road, behind Reliance Digital, in Purulia, West Bengal 723101. Led by Dr. Deepankar Bhattacharya, the clinic offers comprehensive dental services including pediatric dentistry, endodontics, emergency dental care, and preventive treatments. The clinic is open Monday to Saturday, 10 AM to 2 PM and 5 PM to 8 PM. Book your appointment by calling (+91) 7050576335.',
  },
  {
    question: 'Where can I find a dentist near me in Purulia?',
    answer: 'Incapremo Dental Care is a dentist near me in Purulia at Deshbandhu Road, behind Reliance Digital, Purulia, West Bengal 723101. We are open Monday to Saturday, 10 AM to 2 PM and 5 PM to 8 PM, and we keep same-day slots available for emergencies. Call (+91) 7050576335 before travelling and we will confirm the earliest appointment for you.',
  },
  {
    question: 'Do you have a pediatric dentist near me for my child?',
    answer: 'Yes. Dr. Deepankar Bhattacharya holds a B.D.S. and an M.D.S. in Pediatric Dentistry and Preventive Dentistry, and is a former Ex-Associate Professor. If you are searching for a pediatric dentist near me in Purulia, Kolkata or across West Bengal, our clinic treats children from their first dental visit through pulp therapy, dental trauma management and interceptive orthodontics, in a calm, child-friendly environment.',
  },
  {
    question: 'When should I take my child to a kids dentist near me?',
    answer: 'The American Academy of Pediatric Dentistry recommends a first dental visit by age one, or within six months of the first tooth erupting. A kids dentist near me can spot early decay, tongue-tie, bite problems and thumb-sucking habits long before they cause pain. From age two onward, six-monthly check-ups and fluoride varnish help protect baby teeth until the adult teeth arrive.',
  },
  {
    question: 'Do you provide orthodontics in Kolkata?',
    answer: 'Yes. We provide interceptive orthodontics in Kolkata and across West Bengal, including custom space maintainers after early tooth loss, habit-breaking appliances for thumb sucking and pacifier use, and growth-guiding appliances for developing bite problems. A growth assessment around age seven can often prevent the need for lengthy braces treatment later. Call (+91) 7050576335 to book an orthodontic consultation in Purulia.',
  },
  {
    question: 'What dental treatment do you offer in Purulia and Kolkata?',
    answer: 'We offer dental treatment in Purulia for the whole family: preventive dentistry with sealants and fluoride, pediatric endodontics (pulpotomy, pulpectomy and root canal), dental trauma management including re-implantation and splinting, space maintenance and growth modification, pediatric periodontics, teeth whitening, scaling, crowns and emergency dental care. Patients also travel to us for dental treatment in Kolkata from nearby towns such as Bokaro, Dhanbad and Asansol.',
  },
  {
    question: 'How do I choose the best dentist near me?',
    answer: 'When comparing the best dentist near me, look at qualifications, whether the dentist holds a specialist degree in the area you need, how they explain your treatment plan, and whether they ever recommend unnecessary work. At Incapremo Dental Care you will get a clear diagnosis, a written estimate of options, and honest advice about whether you need to come in at all. Our 4.9-star Google rating reflects 5,000+ patients treated.',
  },
  {
    question: 'Is there a dental clinic near me open on Saturdays?',
    answer: 'Yes. Incapremo Dental Care, a dental clinic near me on Deshbandhu Road in Purulia, is open Monday through Saturday with two sessions: 10 AM to 2 PM and 5 PM to 8 PM. Sunday is closed, so plan routine check-ups and cleanings on a weekday or Saturday, and save the emergency line (+91) 7050576335 for urgent problems such as swelling, trauma or severe pain.',
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://incapremodentalcare.com/#faq',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
      <button
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>
          &#8250;
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Common Questions</h2>
          <p className={styles.faqSubtitle}>Quick answers about dental care</p>
        </div>
        <div className={styles.faqGrid}>
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

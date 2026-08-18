import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import styles from './About.module.css';

const team = [
  {
    name: 'Dr. Deepankar Bhattacharya',
    role: 'Associate Professor — Pediatric & Preventive Dentistry',
    qualifications: 'B.D.S., M.D.S. (Pediatric Dentistry)',
    bio: 'Dr. Deepankar Bhattacharya is an Associate Professor in the Department of Pediatric and Preventive Dentistry at Mithila Minority Dental College. He has published several research articles and brings deep expertise in pediatric dental procedures, including treatment for patients with special health care needs.',
    specializations: [
      'Preventive Dentistry',
      'Pediatric Endodontics',
      'Dental Trauma Management',
      'Space Maintenance & Growth Modification',
      'Pediatric Periodontics',
    ],
    languages: ['Hindi', 'English', 'Bengali'],
    interests: ['Reading', 'Music', 'Sports'],
  },
];

const values = [
  { icon: '&#10003;', title: 'Patient First', description: 'Your comfort and health are our top priorities in everything we do.' },
  { icon: '&#127919;', title: 'Excellence', description: 'We use the latest technology and techniques for the best outcomes.' },
  { icon: '&#129309;', title: 'Integrity', description: 'Transparent pricing and honest recommendations, always.' },
  { icon: '&#128156;', title: 'Compassion', description: 'We understand dental anxiety and create a welcoming environment.' },
];

export default function About() {
  return (
    <>
      <SEO title="About Us" description="Learn about Incapremo Dental Care. Meet our experienced team, discover our values, and see why patients trust us." url="/about" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.pageSubtitle}>Creating brighter smiles since 2005.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div className={styles.storyContent}>
              <h2>Our Story</h2>
              <p>Incapremo Dental Care is led by Dr. Deepankar Bhattacharya, an Associate Professor in the Department of Pediatric and Preventive Dentistry at Mithila Minority Dental College. With B.D.S. and M.D.S. qualifications in Pediatric Dentistry, he brings a strong academic and clinical foundation to the practice.</p>
              <p>Dr. Bhattacharya has published several research articles and has deep expertise in pediatric dental procedures, including specialized treatment for patients with special health care needs. His mission is to make every visit comfortable, informed, and effective.</p>
              <p>Fluent in Hindi, English, and Bengali, he connects with a diverse community of patients. Outside the clinic, his interests include reading, music, and sports.</p>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.placeholder}>
                <span>&#127970;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">The principles that guide everything we do.</p>
          <div className="grid grid-4">
            {values.map((v, i) => (
              <motion.div key={i} className={styles.valueCard} whileHover={{ y: -4 }}>
                <span className={styles.valueIcon} dangerouslySetInnerHTML={{ __html: v.icon }} />
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">Dedicated professionals committed to your oral health.</p>
          <div className="grid grid-4">
            {team.map((member, i) => (
              <motion.div key={i} className={styles.teamCard} whileHover={{ y: -4 }}>
                <div className={styles.teamAvatar}>{member.name.split(' ').pop().charAt(0)}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                {member.qualifications && <p className={styles.teamQual}>{member.qualifications}</p>}
                <p className={styles.teamBio}>{member.bio}</p>
                {member.specializations && (
                  <div className={styles.teamSpecs}>
                    <span className={styles.teamSpecLabel}>Specializations</span>
                    <ul className={styles.teamSpecList}>
                      {member.specializations.map((spec) => (
                        <li key={spec} className={styles.teamSpecItem}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {member.languages && (
                  <div className={styles.teamTags}>
                    <span className={styles.teamTagLabel}>Languages:</span>
                    {member.languages.map((lang) => (
                      <span key={lang} className={styles.teamTag}>{lang}</span>
                    ))}
                  </div>
                )}
                {member.interests && (
                  <div className={styles.teamTags}>
                    <span className={styles.teamTagLabel}>Interests:</span>
                    {member.interests.map((item) => (
                      <span key={item} className={styles.teamTag}>{item}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

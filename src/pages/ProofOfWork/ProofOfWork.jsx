import SEO from '../../components/SEO/SEO';
import styles from './ProofOfWork.module.css';

const workItems = [
  { src: '/gall1.webp', alt: 'Restored smile after dental treatment' },
  { src: '/gall2.webp', alt: 'Pediatric dental care in progress' },
  { src: '/gall3.webp', alt: 'Preventive dental treatment result' },
  { src: '/gall4.jpeg', alt: 'Modern dental clinical setup' },
  { src: '/gall5.jpeg', alt: 'Advanced dental equipment and tools' },
  { src: '/gall6.jpeg', alt: 'Happy patient after dental procedure' },
];

export default function ProofOfWork() {
  return (
    <>
      <SEO title="Proof of Work" description="See the results of our dental care — real work, real smiles." url="/proof-of-work" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Proof of Work</h1>
          <p className={styles.pageSubtitle}>A showcase of our dental care and clinical results.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {workItems.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

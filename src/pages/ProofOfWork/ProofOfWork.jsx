import SEO from '../../components/SEO/SEO';
import styles from './ProofOfWork.module.css';

const workItems = [
  '/gall1.webp',
  '/gall2.webp',
  '/gall3.webp',
  '/gall4.jpeg',
  '/gall5.jpeg',
  '/gall6.jpeg',
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
            {workItems.map((src, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={src} alt={`Work ${i + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

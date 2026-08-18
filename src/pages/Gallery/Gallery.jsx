import SEO from '../../components/SEO/SEO';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import styles from './Gallery.module.css';

export default function Gallery() {
  return (
    <>
      <SEO title="Gallery" description="View before and after photos of our dental work. See the results our patients have achieved at Bright Smile Dental." url="/gallery" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Our Gallery</h1>
          <p className={styles.pageSubtitle}>Before and after photos showcasing our dental work.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}

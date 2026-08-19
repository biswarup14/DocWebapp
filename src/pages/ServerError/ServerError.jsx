import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import styles from './ServerError.module.css';

export default function ServerError() {
  return (
    <>
      <SEO
        title="Server Error"
        description="Something went wrong on our end. Please try again later."
        url="/500"
        noindex
      />
      <section className={styles.errorPage}>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.code}>500</h1>
            <h2 className={styles.title}>Server Error</h2>
            <p className={styles.message}>
              Something went wrong on our end. Please try again later.
            </p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you were looking for could not be found."
        url="/404"
        keywords={[]}
        noindex
        schema={false}
      />
      <section className={styles.errorPage}>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.title}>Page Not Found</h2>
            <p className={styles.message}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}

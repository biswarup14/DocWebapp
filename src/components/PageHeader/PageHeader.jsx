import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle, children, variant = 'default' }) {
  return (
    <section className={`${styles.pageHeader} ${variant === 'emergency' ? styles.emergency : ''}`}>
      <div className="container">
        {children}
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}

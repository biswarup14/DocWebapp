import SEO from '../../components/SEO/SEO';
import BlogCard from '../../components/BlogCard/BlogCard';
import { blogPosts } from '../../data/blogPosts';
import styles from './Blog.module.css';

export default function Blog() {
  return (
    <>
      <SEO title="Blog" description="Dental tips, oral health advice, and news from Bright Smile Dental. Stay informed about the latest in dental care." url="/blog" />

      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Our Blog</h1>
          <p className={styles.pageSubtitle}>Tips, insights, and news from our dental team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="styles.grid">
            <div className={styles.blogGrid}>
              {blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

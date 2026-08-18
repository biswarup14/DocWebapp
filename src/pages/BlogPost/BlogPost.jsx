import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import { blogPosts } from '../../data/blogPosts';
import styles from './BlogPost.module.css';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">Post Not Found</h1>
          <p style={{ marginBottom: 24, color: 'var(--color-text-secondary)' }}>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </section>
    );
  }

  const url = `https://brightsmiledental.com/blog/${post.id}`;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.id}`}
        type="article"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          author: { '@type': 'Person', name: post.author },
          datePublished: post.date,
          description: post.excerpt,
        })}
      </script>

      <section className={styles.pageHeader}>
        <div className="container">
          <Link to="/blog" className={styles.backLink}>&#8592; Back to Blog</Link>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.pageTitle}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className={styles.article}>
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h2 key={i} className={styles.h2}>{paragraph.replace(/\*\*/g, '')}</h2>;
              }
              if (paragraph.startsWith('**')) {
                const parts = paragraph.split('\n');
                return (
                  <div key={i}>
                    {parts.map((part, j) => {
                      if (part.startsWith('**')) {
                        return <h3 key={j} className={styles.h3}>{part.replace(/\*\*/g, '')}</h3>;
                      }
                      return <p key={j} className={styles.p}>{part}</p>;
                    })}
                  </div>
                );
              }
              return <p key={i} className={styles.p}>{paragraph}</p>;
            })}
          </article>

          <div className={styles.shareSection}>
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className={styles.cta}>
            <p>Have questions? <Link to="/contact">Contact our team</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}

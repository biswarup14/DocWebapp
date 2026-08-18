import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import BlogCard from '../../components/BlogCard/BlogCard';
import { BlogContext, isAdminLoggedIn, adminLogin } from '../../context/BlogContext';
import styles from './Blog.module.css';

function AdminLoginModal({ onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminLogin(password)) {
      onClose();
      navigate('/admin');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>&#10005;</button>
        <h3>Admin Login</h3>
        <p>Enter your password to manage blog posts.</p>
        {error && <p className={styles.modalError}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.modalField}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Blog() {
  const { posts } = useContext(BlogContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <SEO title="Blog" description="Dental tips, oral health advice, and news from Bright Smile Dental. Stay informed about the latest in dental care." url="/blog" />

      <section className={styles.pageHeader}>
        <div className={`container ${styles.headerInner}`}>
          <div>
            <h1 className={styles.pageTitle}>Our Blog</h1>
            <p className={styles.pageSubtitle}>Tips, insights, and news from our dental team.</p>
          </div>
          <button
            className={styles.adminBtn}
            onClick={() => isAdminLoggedIn() ? window.location.href = '/admin' : setShowLogin(true)}
          >
            &#9881; Admin
          </button>
        </div>
      </section>

      {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>No blog posts yet.</p>
              <Link to="/admin" className="btn btn-primary">Create First Post</Link>
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {posts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

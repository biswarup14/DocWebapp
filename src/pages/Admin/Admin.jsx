import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext, isAdminLoggedIn, adminLogin, adminLogout } from '../../context/BlogContext';
import SEO from '../../components/SEO/SEO';
import styles from './Admin.module.css';

const defaultForm = {
  title: '',
  excerpt: '',
  content: '',
  author: 'Dr. Sarah Mitchell',
  category: 'Oral Hygiene',
  readTime: '4 min read',
};

const categories = ['Oral Hygiene', 'Nutrition', 'Patient Care', 'Pediatric Dentistry', 'Cosmetic', 'General'];

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminLogin(password)) {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <p>Enter the admin password to manage blog posts.</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Enter password"
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>
        <p className={styles.hint}>Default: brightsmile2025</p>
      </form>
    </div>
  );
}

function PostEditor({ post, onSave, onCancel }) {
  const [form, setForm] = useState(post || defaultForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <h3>{post ? 'Edit Post' : 'New Post'}</h3>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required value={form.title} onChange={handleChange} placeholder="Blog post title" />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="author">Author</label>
          <input id="author" name="author" required value={form.author} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="readTime">Read Time</label>
          <input id="readTime" name="readTime" value={form.readTime} onChange={handleChange} placeholder="4 min read" />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="excerpt">Excerpt</label>
        <input id="excerpt" name="excerpt" required value={form.excerpt} onChange={handleChange} placeholder="Short summary for the blog card" />
      </div>
      <div className={styles.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          required
          rows="16"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your blog post content here. Use double line breaks for paragraphs. Use **bold text** for bold, and start a line with **Title** to make a heading."
          className={styles.contentArea}
        />
      </div>
      <div className={styles.editorActions}>
        <button type="submit" className="btn btn-primary">Save Post</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [view, setView] = useState('list');
  const [editingPost, setEditingPost] = useState(null);

  if (!loggedIn) {
    return (
      <>
        <SEO title="Admin" url="/admin" />
        <LoginForm onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return (
    <AdminDashboard
      view={view}
      setView={setView}
      editingPost={editingPost}
      setEditingPost={setEditingPost}
      onLogout={() => { adminLogout(); setLoggedIn(false); }}
    />
  );
}

function AdminDashboard({ view, setView, editingPost, setEditingPost, onLogout }) {
  const { posts, addPost, updatePost, deletePost } = useContext(BlogContext);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSave = (formData) => {
    if (editingPost) {
      updatePost(editingPost.id, formData);
      showSuccess('Post updated successfully!');
    } else {
      addPost(formData);
      showSuccess('Post created successfully!');
    }
    setEditingPost(null);
    setView('list');
  };

  const handleDelete = (id) => {
    deletePost(id);
    setConfirmDelete(null);
    showSuccess('Post deleted.');
  };

  if (view === 'editor') {
    return (
      <>
        <SEO title="Blog Editor" url="/admin" />
        <div className={styles.dashboard}>
          <div className={`container ${styles.topBar}`}>
            <Link to="/admin" className={styles.backLink} onClick={() => { setView('list'); setEditingPost(null); }}>
              &#8592; Back to Posts
            </Link>
            <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
          </div>
          <div className="container">
            <PostEditor
              post={editingPost}
              onSave={handleSave}
              onCancel={() => { setView('list'); setEditingPost(null); }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Blog Admin" url="/admin" />
      <div className={styles.dashboard}>
        <div className={`container ${styles.topBar}`}>
          <h1 className={styles.dashboardTitle}>Blog Manager</h1>
          <div className={styles.topBarActions}>
            <button className="btn btn-primary" onClick={() => setView('editor')}>
              + New Post
            </button>
            <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
          </div>
        </div>

        <div className="container">
          {successMsg && <div className={styles.success}>{successMsg}</div>}

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search posts by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.postCount}>{filtered.length} post{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <div className={styles.postList}>
            {filtered.length === 0 && (
              <div className={styles.empty}>
                <p>No posts found.</p>
              </div>
            )}
            {filtered.map((post) => (
              <div key={post.id} className={styles.postRow}>
                <div className={styles.postInfo}>
                  <span className={styles.postCategory}>{post.category}</span>
                  <h3 className={styles.postTitle}>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <div className={styles.postMeta}>
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className={styles.postActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => { setEditingPost(post); setView('editor'); }}
                  >
                    Edit
                  </button>
                  {confirmDelete === post.id ? (
                    <div className={styles.confirmDelete}>
                      <span>Delete?</span>
                      <button className={styles.yesBtn} onClick={() => handleDelete(post.id)}>Yes</button>
                      <button className={styles.noBtn} onClick={() => setConfirmDelete(null)}>No</button>
                    </div>
                  ) : (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => setConfirmDelete(post.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

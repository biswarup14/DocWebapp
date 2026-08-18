import { createContext, useState, useEffect } from 'react';
import { blogPosts as defaultPosts } from '../data/blogPosts';

const STORAGE_KEY = 'brightsmile_blog_posts';
const ADMIN_KEY = 'brightsmile_admin_auth';

function loadPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
}

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(loadPosts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      date: new Date().toISOString().split('T')[0],
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id, updates) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const getPost = (id) => posts.find((p) => p.id === id);

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
}

export function adminLogin(password) {
  if (password === 'brightsmile2025') {
    sessionStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(ADMIN_KEY);
}

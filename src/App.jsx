import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const Home = lazy(() => import('./pages/Home/Home'));
const Services = lazy(() => import('./pages/Services/Services'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Appointment = lazy(() => import('./pages/Appointment/Appointment'));
const Testimonials = lazy(() => import('./pages/Testimonials/Testimonials'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ'));
const Insurance = lazy(() => import('./pages/Insurance/Insurance'));
const Emergency = lazy(() => import('./pages/Emergency/Emergency'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost/BlogPost'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div style={{
        width: 40,
        height: 40,
        border: '4px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

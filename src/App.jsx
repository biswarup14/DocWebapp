import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from './components/Layout/Layout';

const Home = lazy(() => import('./pages/Home/Home'));
const Services = lazy(() => import('./pages/Services/Services'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Emergency = lazy(() => import('./pages/Emergency/Emergency'));
const ProofOfWork = lazy(() => import('./pages/ProofOfWork/ProofOfWork'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions/TermsAndConditions'));

function Loader() {
  return (
    <div className="loader">
      <div className="loaderSpinner" />
    </div>
  );
}

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Incapremo Dental Care</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="notFound">
        <h1>404</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    </>
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
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/proof-of-work" element={<ProofOfWork />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

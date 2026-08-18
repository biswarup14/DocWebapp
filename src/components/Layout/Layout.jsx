import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TawkToWidget from './TawkToWidget';
import { trackPageView } from '../../utils/analytics';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="mainContent"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <TawkToWidget />
    </>
  );
}

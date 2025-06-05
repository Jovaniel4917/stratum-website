
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';

// Page imports
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Tools from '@/pages/Tools';
import FAQ from '@/pages/FAQ';
import Privacy from '@/pages/Privacy';
import Sitemap from '@/pages/Sitemap';
import NotFound from '@/pages/NotFound';

import './App.css';

const AppContent = () => {
  // Initialize security monitoring
  useSecurityMonitoring();

  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          
          {/* Legacy redirects */}
          <Route path="/en" element={<Navigate to="/" replace />} />
          <Route path="/es" element={<Navigate to="/" replace />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
};

export default App;

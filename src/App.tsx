
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Import pages
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import PriceCalculator from './pages/PriceCalculator';
import NotFound from './pages/NotFound';
import LeadsPanel from './pages/admin/LeadsPanel';

// Import components
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

function App() {
  useEffect(() => {
    // Initialize application
  }, []);

  return (
    <>
      <SonnerToaster position="top-right" richColors />
      <Toaster />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/price-calculator" element={<PriceCalculator />} />
        <Route path="/admin" element={<LeadsPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

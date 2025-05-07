
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import ProcessSection from '@/components/ProcessSection';
import PageLayout from '@/components/PageLayout';
import QuickEstimateSection from '@/components/QuickEstimateSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import GalleryShowcase from '@/components/GalleryShowcase';

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      
      {/* Best Value Guarantee Banner */}
      <div className="bg-brand-yellow py-4 text-center">
        <div className="container mx-auto px-4">
          <p className="text-black font-bold text-lg md:text-xl">
            BEST VALUE GUARANTEE: Quality renovation at the most competitive prices!
          </p>
        </div>
      </div>
      
      <WhyChooseUsSection />
      <ServicesSection />
      <GalleryShowcase />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <QuickEstimateSection />
      <CtaSection />
    </PageLayout>
  );
};

export default Index;

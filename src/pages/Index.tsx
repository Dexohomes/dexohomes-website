
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import QuickEstimateSection from '@/components/QuickEstimateSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import CtaSection from '@/components/CtaSection';
import PageLayout from '@/components/PageLayout';
import EnhancedCta from '@/components/EnhancedCta';

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      
      <ServicesSection />
      
      <EnhancedCta
        title="Create Your Dream Home"
        description="Our award-winning interior design team will transform your space into a stunning retreat that perfectly reflects your personal style and meets your functional needs."
        buttonText="Schedule a Consultation"
        source="Dream Home CTA"
        backgroundImage="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000"
      />
      
      <ProcessSection />
      
      <QuickEstimateSection />
      
      <EnhancedCta
        title="Professional Kitchen & Bath Design"
        description="Kitchens and bathrooms sell homes. Let our experts create functional, beautiful spaces that add value to your property and joy to your daily life."
        buttonText="Get Expert Advice"
        source="Kitchen & Bath CTA"
        imagePosition="left"
        backgroundImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e97?auto=format&fit=crop&q=80&w=2000"
      />
      
      <PortfolioSection />
      
      <TestimonialsSection />
      
      <CtaSection
        variant="secondary"
        title="Ready to Transform Your Space?"
        description="Contact our team today for a personalized consultation and see how we can bring your vision to life."
        buttonText="Contact Us Now"
        usePopup={true}
        popupSource="Footer CTA"
      />
    </PageLayout>
  );
};

export default Index;


import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const revealRef = useReveal();
  const { toast } = useToast();

  useEffect(() => {
    // Show welcome toast after 2 seconds
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to Dexohomes!",
        description: "Explore our services and get a free estimate for your interior design project.",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div ref={revealRef} className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <ServicesSection />
        
        <CtaSection 
          variant="primary"
          title="Transform Your Space with Expert Design"
          description="From concept to completion, our interior design experts will guide you through every step of the process."
          buttonText="Get Started Today"
          className="reveal-on-scroll"
        />
        
        <PortfolioSection />
        
        <ProcessSection />
        
        <TestimonialsSection />
        
        <CtaSection 
          variant="secondary"
          title="Ready to Transform Your Space?"
          description="Schedule a consultation with our design experts and start your interior transformation journey."
          buttonText="Book a Consultation"
          className="reveal-on-scroll"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

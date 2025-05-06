
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { ArrowRight, IndianRupee, Star } from "lucide-react";
import QuickEstimateSection from "@/components/QuickEstimateSection";

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
        
        {/* Featured Projects Preview */}
        <section className="py-12 bg-brand-yellow/5">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
              <p className="text-brand-gray-dark">Get inspired by our recent transformations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 transition-transform cursor-pointer"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-166${item}000000-abcdefghijkl?auto=format&fit=crop&w=800&q=80`}
                    alt={`Featured project ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-brand-yellow text-brand-dark hover:bg-brand-yellow/10" asChild>
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Trust Indicators */}
        <section className="py-8 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brand-yellow">500+</div>
                <div className="text-sm text-brand-gray-dark">Happy Clients</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brand-yellow">15+</div>
                <div className="text-sm text-brand-gray-dark">Years Experience</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brand-yellow">1200+</div>
                <div className="text-sm text-brand-gray-dark">Projects Completed</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-3xl font-bold text-brand-yellow">
                  4.9
                  <Star className="h-5 w-5 ml-1 fill-brand-yellow" />
                </div>
                <div className="text-sm text-brand-gray-dark">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>
        
        <ServicesSection />
        
        <QuickEstimateSection />
        
        <PortfolioSection />
        
        <ProcessSection />
        
        <TestimonialsSection />
        
        {/* Mobile App-like CTA section */}
        <section className="py-16 bg-gray-50 reveal-on-scroll">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                  Carry Dexohomes in Your Pocket
                </h2>
                <p className="text-lg text-brand-gray-dark mb-8">
                  Our mobile-friendly website gives you access to all our services, 
                  portfolios, and the price calculator tool on the go.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black py-6 group"
                    asChild
                  >
                    <Link to="/price-calculator">
                      Calculate Your Price
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-brand-yellow text-brand-dark hover:text-brand-yellow"
                    asChild
                  >
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md">
                  <IndianRupee className="h-5 w-5 mr-2" />
                  <span className="font-medium">Best Value Guaranteed</span>
                </div>
              </div>
              <div className="relative mx-auto max-w-[280px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/20 to-transparent rounded-[40px] blur-lg"></div>
                <div className="relative bg-white rounded-[40px] p-4 shadow-xl border-8 border-black">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-black rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
                    alt="Mobile preview" 
                    className="w-full h-[460px] object-cover rounded-3xl"
                  />
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CtaSection 
          variant="secondary"
          title="Ready to Transform Your Space?"
          description="Schedule a consultation with our design experts and start your interior transformation journey."
          buttonText="Book a Consultation"
          buttonLink="/contact"
          className="reveal-on-scroll"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { useEffect, useRef } from "react";
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
import { ArrowRight, IndianRupee, Star, Check, TrendingUp, Award, Shield } from "lucide-react";
import QuickEstimateSection from "@/components/QuickEstimateSection";
import QuickContactForm from "@/components/QuickContactForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const revealRef = useReveal();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const quoteFormRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Show welcome toast after 2 seconds
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to Dexohomes!",
        description: "Explore our services and get a free estimate for your interior design project.",
        duration: 5000,
      });
    }, 2000);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div ref={revealRef} className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Best Value Guarantee - Prominently displayed below hero */}
        <section className="py-6 bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-white rounded-xl shadow-lg border border-brand-yellow/20">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-yellow/20 p-3">
                  <Shield className="h-6 w-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Best Value Guarantee</h3>
                  <p className="text-sm text-gray-600">Highest quality at competitive prices</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-yellow/20 p-3">
                  <Award className="h-6 w-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Premium Materials</h3>
                  <p className="text-sm text-gray-600">Durable, long-lasting quality</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-yellow/20 p-3">
                  <TrendingUp className="h-6 w-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Transparent Pricing</h3>
                  <p className="text-sm text-gray-600">No hidden fees or surprises</p>
                </div>
              </div>
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
        
        {/* Recent Projects Preview */}
        <section className="py-12 bg-brand-yellow/5">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Recent Projects</h2>
              <p className="text-brand-gray-dark">Our latest interior transformations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
              ].map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden shadow-md hover-lift cursor-pointer"
                >
                  <img 
                    src={image}
                    alt={`Recent project ${index+1}`}
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
        
        {/* Services Section with scroll to form button */}
        <ServicesSection />
        
        {/* Why Choose Us */}
        <section className="py-16 bg-white reveal-on-scroll">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Dexohomes?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine aesthetics with functionality to create spaces that reflect your personality and meet your needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                <div className="rounded-full bg-brand-yellow/20 w-14 h-14 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                <p className="text-gray-600">
                  We use only the highest quality materials and fixtures to ensure your interiors stand the test of time.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Durable materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Quality craftsmanship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Designer furnishings</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                <div className="rounded-full bg-brand-yellow/20 w-14 h-14 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Design Team</h3>
                <p className="text-gray-600">
                  Our award-winning designers bring creativity and technical expertise to every project.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Certified designers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Personalized attention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Innovative solutions</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                <div className="rounded-full bg-brand-yellow/20 w-14 h-14 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Satisfaction Guarantee</h3>
                <p className="text-gray-600">
                  We stand behind our work with a satisfaction guarantee and excellent after-service support.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">On-time completion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Budget adherence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Post-project support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <QuickEstimateSection />
        
        {/* Connect Portfolio Section to quote form */}
        <PortfolioSection />
        
        {/* Connect Process Section to quote form */}
        <ProcessSection />
        
        <TestimonialsSection />
        
        {/* Get a Quote Section */}
        <section id="quote-form-section" ref={quoteFormRef} className="py-16 bg-gray-50 reveal-on-scroll">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Get a Free Quote</h2>
                <p className="mb-6 text-gray-600">
                  Fill out the form below and our design consultants will contact you shortly to discuss your project.
                </p>
                <QuickContactForm variant="primary" source="Homepage Quote Form" />
              </div>
              <div className="space-y-6 md:pl-10">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-brand-yellow/20 p-3">
                      <IndianRupee className="h-6 w-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Transparent Pricing</h3>
                      <p className="text-gray-600">No hidden costs or surprise charges</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-brand-yellow/20 p-3">
                      <Check className="h-6 w-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                      <p className="text-gray-600">Premium materials and expert craftsmanship</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-brand-yellow/20 p-3">
                      <Star className="h-6 w-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">5-Star Service</h3>
                      <p className="text-gray-600">Trusted by 500+ satisfied customers</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black" 
                  asChild
                >
                  <Link to="/price-calculator">
                    Try Our Price Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
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
                    onClick={() => {
                      // Scroll to the quote form
                      quoteFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact Us
                  </Button>
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
          scrollToQuoteForm={true}
          className="reveal-on-scroll"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import QuickContactForm from "./QuickContactForm";
import { useIsMobile } from "@/hooks/use-mobile";
import CtaPopup from "./CtaPopup";

const HeroSection = () => {
  const [formType, setFormType] = useState<"default" | "professional" | "premium">("default");
  const isMobile = useIsMobile();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section 
      className="relative pt-16 pb-12 md:pt-24 md:pb-20 bg-cover bg-center" 
      style={{
        backgroundImage: isMobile ? 
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80')" : 
          "none",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance ${isMobile ? 'text-white' : 'text-brand-dark'}`}>
              Transform Your Space with Expert Interior Design
            </h1>
            <p className={`mt-6 text-xl max-w-xl ${isMobile ? 'text-white/90' : 'text-brand-gray-dark'}`}>
              Elevate your home with our professional interior design services. From consultation to execution, we create spaces that reflect your style.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-yellow hover:bg-brand-yellow/90 text-black py-6 group" onClick={() => setIsPopupOpen(true)}>
                Get Free Consultation
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" size="lg" className={`border-brand-gray-dark hover:bg-gray-100 py-6 ${isMobile ? 'bg-white/20 text-white border-white' : 'text-brand-dark'}`} asChild>
                <Link to="/portfolio">
                  View Our Work
                </Link>
              </Button>

              <CtaPopup 
                open={isPopupOpen} 
                onOpenChange={setIsPopupOpen}
                source="Hero Section" 
                title="Get Your Free Design Consultation"
                description="Our expert designers are ready to help you transform your space."
              />
            </div>
            
            <div className={`mt-8 flex items-center ${isMobile ? 'bg-white/20 p-3 rounded-lg' : ''}`}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-166${i}000000-abcdefghijkl?auto=format&fit=crop&w=60&q=80`} 
                      alt={`Customer ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className={`text-sm font-medium ${isMobile ? 'text-white' : ''}`}>
                  Trusted by 500+ happy clients
                </div>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            {!isMobile ? (
              <Card className="w-full max-w-md mx-auto lg:ml-auto shadow-lg border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Get Your Price Estimate</h2>
                    <p className="text-brand-gray-dark text-sm">Fill out the form below for a quick estimate</p>
                  </div>
                  <QuickContactForm />
                </CardContent>
              </Card>
            ) : (
              <div className="bg-brand-yellow p-4 rounded-lg shadow-lg text-center mb-8">
                <div className="inline-flex items-center px-3 py-1 bg-white/80 rounded-full text-sm font-medium mb-3">
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Premium Design Services</span>
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">Transform Your Space</h2>
                <p className="text-gray-800 mb-4">Luxury designs at affordable prices!</p>
                <Button 
                  className="w-full bg-black text-white hover:bg-black/80 py-6"
                  size="lg"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Value Proposition Banner for Mobile */}
      {isMobile && (
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-lg font-bold text-green-800">Premium Design Experience</h3>
            </div>
            <p className="text-sm text-center text-green-700 mt-1">
              Creating spaces you'll love at prices you can afford
            </p>
          </div>
        </div>
      )}
      
      {/* Bottom gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;

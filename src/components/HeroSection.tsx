
import { Button } from "@/components/ui/button";
import { ArrowRight, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import QuickContactForm from "./QuickContactForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-yellow opacity-10"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-brand-yellow opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-6 items-center">
          <div className="space-y-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight">
                Transform Your Space with{" "}
                <span className="text-brand-yellow">Interior Excellence</span>
              </h1>
              <p className="mt-6 text-lg text-brand-gray-dark max-w-lg">
                Dexohomes brings your interior dreams to life with expert design, 
                quality craftsmanship, and personalized service that exceeds expectations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black text-lg px-8 py-6"
                asChild
              >
                <Link to="/price-calculator">
                  Get Free Estimate
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-yellow text-brand-dark hover:text-brand-yellow text-lg px-8 py-6"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Portfolio
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold">500+ Happy Clients</div>
                <div className="text-sm text-brand-gray-dark">Join our satisfied customers</div>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-scale-in" 
            style={{animationDelay: "0.4s"}}
          >
            <div className="text-center mb-8 space-y-4">
              <h2 className="text-3xl font-bold text-brand-dark">Calculate Your Price</h2>
              <p className="text-brand-gray-dark">Get an estimate for your dream interior design project</p>
              <div className="flex justify-center">
                <span className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md">
                  <IndianRupee className="h-5 w-5 mr-2" />
                  <span className="text-lg font-medium">Best Value</span>
                </span>
              </div>
              <p className="text-sm text-brand-gray-dark">
                Our transparent pricing ensures you get the best value for your investment.
                No hidden fees, no surprises!
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 cursor-pointer transition">
                  <p className="text-lg font-semibold">Basic</p>
                  <p className="text-sm text-gray-500">Design Only</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center hover:bg-yellow-100 cursor-pointer transition border-2 border-brand-yellow">
                  <p className="text-lg font-semibold">Standard</p>
                  <p className="text-sm text-gray-500">Most Popular</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 cursor-pointer transition">
                  <p className="text-lg font-semibold">Premium</p>
                  <p className="text-sm text-gray-500">Full Service</p>
                </div>
              </div>

              <Button 
                className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold py-6 text-lg group"
                asChild
              >
                <Link to="/price-calculator">
                  Get Your Personalized Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <p className="text-xs text-center text-brand-gray-dark">
                Free, no-obligation estimate. Receive your detailed quote within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

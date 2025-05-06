
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white bg-opacity-95 shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-dark">
              <span className="text-brand-yellow">Dexo</span>homes
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#services"
                className="font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#process"
                className="font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              >
                Our Process
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              >
                Testimonials
              </a>
            </li>
          </ul>

          <Button className="bg-brand-yellow hover:bg-brand-yellow/90 text-black flex items-center gap-2" size="sm">
            <Phone className="w-4 h-4" />
            <span>Call Us</span>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1">
              <span 
                className={`block h-0.5 bg-brand-dark transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span 
                className={`block h-0.5 bg-brand-dark transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span 
                className={`block h-0.5 bg-brand-dark transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 pt-20 px-6 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col space-y-6">
          <li>
            <a
              href="#services"
              className="text-xl font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="text-xl font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#process"
              className="text-xl font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Process
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-xl font-medium text-brand-dark hover:text-brand-yellow transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
          </li>
          <li>
            <Button 
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black flex items-center gap-2 w-full justify-center" 
              size="lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

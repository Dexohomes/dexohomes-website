import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open menu</span>
            {/* Heroicon name: outline/menu */}
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-brand-yellow transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-brand-yellow transition-colors">
              Services
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-brand-yellow transition-colors">
              Projects
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-brand-yellow transition-colors">
              Contact
            </Link>
            <Link to="/price-calculator" className="text-gray-600 hover:text-brand-yellow transition-colors">
              Price Calculator
            </Link>
            
            <Link 
              to="/admin" 
              className="text-gray-600 hover:text-brand-yellow transition-colors"
            >
              Admin
            </Link>
          </nav>
          
          <div className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link 
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/projects"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/price-calculator"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Price Calculator
              </Link>
              
              <Link 
                to="/admin"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

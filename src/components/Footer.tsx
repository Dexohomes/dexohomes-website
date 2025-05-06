
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold">
                <span className="text-brand-yellow">Dexo</span>homes
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming spaces into beautiful, functional environments that reflect your unique style and personality.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Instagram"
              >
                i
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Pinterest"
              >
                p
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                l
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Full Home Interior
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Kitchen Renovation
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Bathroom Renovation
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Custom Wardrobes
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Commercial Spaces
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#process" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for design tips and special offers.
            </p>
            <form className="flex flex-col space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none focus-visible:ring-brand-yellow"
                />
                <Button type="submit" className="rounded-l-none bg-brand-yellow text-black hover:bg-brand-yellow/90">
                  Send
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dexohomes. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

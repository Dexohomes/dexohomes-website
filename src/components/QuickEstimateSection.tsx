
import React from 'react';
import { IndianRupee } from 'lucide-react';
import QuickContactForm from './QuickContactForm';

const QuickEstimateSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md">
              <IndianRupee className="h-5 w-5 mr-2" />
              <span className="text-lg font-medium">Best Value Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Get Your Custom Interior Design Quote
            </h2>
            <p className="text-lg text-brand-gray-dark">
              Fill in your details and our team will provide a personalized quote tailored to your needs.
              Enjoy premium design services at honest, transparent prices.
            </p>
            <ul className="space-y-3">
              {[
                "No hidden fees or charges",
                "Flexible payment options",
                "Value-based pricing structure",
                "Free initial consultation"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-brand-yellow mr-3 flex items-center justify-center">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4.5 7.5L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-brand-dark">Request Your Quote</h3>
              <p className="text-sm text-brand-gray-dark">Get a free estimate within 24 hours</p>
            </div>
            <QuickContactForm variant="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEstimateSection;

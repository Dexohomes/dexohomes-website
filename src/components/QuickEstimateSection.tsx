
import React from 'react';
import { IndianRupee, Check } from 'lucide-react';
import QuickContactForm from './QuickContactForm';

const QuickEstimateSection = () => {
  const benefits = [
    { title: "Transparent Pricing", description: "No hidden fees or surprise costs" },
    { title: "Best Value", description: "Premium quality at competitive rates" },
    { title: "Flexible Payment Options", description: "Easy installment plans available" },
    { title: "Free Initial Consultation", description: "No obligation design discussion" },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md">
              <IndianRupee className="h-5 w-5 mr-2" />
              <span className="text-lg font-medium">Awesome Value Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Get Your Custom Interior Design Quote
            </h2>
            <p className="text-lg text-brand-gray-dark">
              Fill in your details and our team will provide a personalized quote tailored to your needs.
              Enjoy premium design services at honest, transparent prices.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-8 w-8 rounded-full bg-brand-yellow mr-3 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">{benefit.title}</h3>
                    <p className="text-sm text-brand-gray-dark">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-yellow-50 border-l-4 border-brand-yellow rounded-r-lg">
              <p className="text-brand-dark">
                <span className="font-bold">Starting from ₹499/sqft</span> for complete home interiors
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            <div className="absolute -top-4 -right-4 bg-brand-yellow text-black px-4 py-2 rounded-lg shadow-md">
              <span className="font-bold">Limited Time Offer</span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-brand-dark">Request Your Quote</h3>
              <p className="text-sm text-brand-gray-dark">Get a free estimate within 24 hours</p>
            </div>
            <QuickContactForm variant="primary" />
            <div className="mt-6 flex items-center justify-center text-sm text-brand-gray-dark">
              <IndianRupee className="h-4 w-4 mr-1 text-green-600" />
              <span>Best value guaranteed in the industry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEstimateSection;

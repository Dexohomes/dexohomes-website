
import React from 'react';
import { CheckCircle, Shield, Award, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";

const features = [
  {
    id: 1,
    icon: <CheckCircle className="w-12 h-12 text-brand-yellow" />,
    title: "Quality Craftsmanship",
    description: "Our experienced team delivers superior quality in every project, ensuring beautiful, long-lasting results."
  },
  {
    id: 2,
    icon: <Shield className="w-12 h-12 text-brand-yellow" />,
    title: "Licensed & Insured",
    description: "We maintain all necessary licenses and insurance, providing peace of mind throughout your renovation."
  },
  {
    id: 3,
    icon: <Award className="w-12 h-12 text-brand-yellow" />,
    title: "Best Value Guarantee",
    description: "Get the best quality at competitive prices with our transparent pricing and no hidden costs."
  },
  {
    id: 4,
    icon: <Clock className="w-12 h-12 text-brand-yellow" />,
    title: "On-Time Completion",
    description: "We respect your time and deliver projects within agreed timelines, with clear communication throughout."
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-brand-yellow">Choose Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Dexohomes, we deliver exceptional service through quality craftsmanship, 
            attention to detail, and a customer-first approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-gray-50 rounded-lg p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-brand-yellow text-black font-bold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            Our commitment: Quality, Value, and Satisfaction
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;


import React from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "We start by understanding your vision, requirements, and budget through a detailed consultation.",
    icon: "📋",
  },
  {
    number: "02",
    title: "Design Concept",
    description:
      "Our designers create custom concept designs tailored to your space and preferences.",
    icon: "✏️",
  },
  {
    number: "03",
    title: "Detailed Planning",
    description:
      "We develop detailed plans, select materials, and finalize the project scope and timeline.",
    icon: "📐",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "Our skilled team brings the design to life with precision and attention to every detail.",
    icon: "🔨",
  },
  {
    number: "05",
    title: "Final Reveal",
    description:
      "Experience the transformation of your space and enjoy your beautiful new interior.",
    icon: "✨",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Our <span className="text-brand-yellow">Process</span>
          </h2>
          <p className="text-brand-gray-dark text-lg max-w-2xl mx-auto">
            We follow a structured approach to ensure your interior project is completed
            efficiently, on time, and exceeds your expectations.
          </p>
        </div>

        <div className="relative">
          {/* Process line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gray-100"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center text-2xl mb-6 relative z-10 shadow-lg">
                  {step.icon}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-50 w-full">
                  <div className="text-brand-yellow font-bold text-xl mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brand-gray-dark">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-brand-dark max-w-2xl mx-auto mb-8">
            Ready to start transforming your space with our expert team?
          </p>
          <button
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-medium px-8 py-4 rounded-lg transition-colors"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

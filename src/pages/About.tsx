
import React from "react";
import PageLayout from "@/components/PageLayout";
import CtaSection from "@/components/CtaSection";
import QuickContactForm from "@/components/QuickContactForm";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">About Dexohomes</h1>
              <p className="text-lg text-brand-gray-dark mb-6">
                We transform spaces into beautiful, functional environments that reflect your personal style and meet your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-brand-dark">10+</h3>
                  <p className="text-sm text-brand-gray-dark">Years Experience</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-brand-dark">500+</h3>
                  <p className="text-sm text-brand-gray-dark">Projects Completed</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-brand-dark">95%</h3>
                  <p className="text-sm text-brand-gray-dark">Client Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80" 
                alt="Interior Design Team" 
                className="w-full h-auto object-cover rounded-lg reveal-on-scroll"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6 reveal-on-scroll">
                <p className="text-lg text-brand-gray-dark">
                  Founded in 2010, Dexohomes began with a simple mission: to create beautiful, functional spaces that 
                  enhance people's lives. Our founder, Sarah Chen, combined her passion for design with 
                  her architectural expertise to build a company centered on client satisfaction and exceptional design.
                </p>
                <p className="text-lg text-brand-gray-dark">
                  Over the years, we've grown from a small studio to a full-service interior design firm, 
                  handling projects of all sizes across the country. What sets us apart is our commitment to understanding 
                  each client's unique style, needs, and vision.
                </p>
                <p className="text-lg text-brand-gray-dark">
                  Today, our team of talented designers, project managers, and craftspeople work together to 
                  deliver exceptional results on time and within budget. We're proud of our work and the 
                  relationships we've built with our clients.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4 reveal-on-scroll">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" 
                  alt="Interior Design Process" 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                <img 
                  src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80" 
                  alt="Interior Design Materials" 
                  className="w-full h-auto object-cover rounded-lg shadow-md" 
                />
              </div>
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80" 
                  alt="Design Planning" 
                  className="w-full h-full object-cover rounded-lg shadow-md" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray-dark">
              Our talented team of designers and professionals is dedicated to creating exceptional spaces.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder & Creative Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
              },
              {
                name: "Michael Torres",
                role: "Lead Designer",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
              },
              {
                name: "Amira Patel",
                role: "Project Manager",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
              },
              {
                name: "David Kim",
                role: "Interior Architect",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl reveal-on-scroll">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark">{member.name}</h3>
                  <p className="text-brand-gray-dark">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA with form */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
              <p className="text-lg mb-8 text-gray-300">
                Contact us today for a free consultation and let us help you create the space of your dreams.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-300">Call us at</div>
                  <div className="text-xl font-semibold">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 reveal-on-scroll">
              <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch</h3>
              <QuickContactForm variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaSection
        variant="primary"
        title="See How Much Your Interior Project Will Cost"
        description="Use our price calculator to get an estimate for your interior design project"
        buttonText="Calculate Price Now"
        className="reveal-on-scroll"
      />
    </PageLayout>
  );
};

export default About;

import { Phone } from "lucide-react";

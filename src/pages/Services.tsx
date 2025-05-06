
import React from "react";
import PageLayout from "@/components/PageLayout";
import CtaSection from "@/components/CtaSection";
import QuickContactForm from "@/components/QuickContactForm";

const services = [
  {
    id: "full-home",
    title: "Full Home Interior",
    description: "Comprehensive interior design solutions for your entire home, creating a cohesive and beautiful living space.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    features: [
      "Complete space planning and layout optimization",
      "Custom furniture selection and procurement",
      "Color scheme development",
      "Lighting design and selection",
      "Material and finish recommendations",
      "Art and accessory curation"
    ]
  },
  {
    id: "kitchen",
    title: "Kitchen Renovation",
    description: "Transforming kitchens into beautiful, functional spaces that are the heart of your home.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    features: [
      "Kitchen layout optimization",
      "Custom cabinetry design",
      "Countertop material selection",
      "Appliance recommendations",
      "Lighting design",
      "Kitchen island design"
    ]
  },
  {
    id: "bathroom",
    title: "Bathroom Renovation",
    description: "Creating luxurious, spa-like bathrooms that provide a daily retreat in your home.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
    features: [
      "Bathroom layout planning",
      "Fixture selection and placement",
      "Tile design and selection",
      "Vanity and storage solutions",
      "Lighting design",
      "Accessory selection"
    ]
  },
  {
    id: "wardrobe",
    title: "Custom Wardrobes",
    description: "Designing custom storage solutions that maximize space and bring organization to your life.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80",
    features: [
      "Custom closet design",
      "Organization system planning",
      "Material and finish selection",
      "Lighting integration",
      "Specialized storage solutions",
      "Hardware selection"
    ]
  },
  {
    id: "living-room",
    title: "Living Room Design",
    description: "Creating welcoming, stylish living spaces for entertaining and everyday enjoyment.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    features: [
      "Space planning and furniture arrangement",
      "Seating selection and placement",
      "Entertainment center design",
      "Custom built-in creation",
      "Lighting design",
      "Accessories and art curation"
    ]
  },
  {
    id: "office",
    title: "Home Office",
    description: "Designing productive and inspiring workspace solutions for your home.",
    image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?auto=format&fit=crop&w=800&q=80",
    features: [
      "Workspace layout planning",
      "Ergonomic furniture selection",
      "Storage and organization systems",
      "Lighting design for productivity",
      "Technology integration",
      "Personalization elements"
    ]
  }
];

const Services = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Our Services</h1>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray-dark">
              We offer comprehensive interior design services tailored to your unique style and needs.
              From full home renovations to single room transformations, our expert team is ready to bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid gap-16">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`grid md:grid-cols-2 gap-10 items-center reveal-on-scroll ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 !== 0 ? "order-1 md:order-2" : ""}`}>
                  <h2 className="text-3xl font-bold text-brand-dark mb-4">{service.title}</h2>
                  <p className="text-lg text-brand-gray-dark mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="inline-block w-5 h-5 bg-brand-yellow rounded-full mr-3 mt-1"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <QuickContactForm className="bg-gray-100 p-6 rounded-lg shadow-md" />
                  </div>
                </div>
                <div className={`${index % 2 !== 0 ? "order-2 md:order-1" : ""}`}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-auto object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaSection
        variant="secondary"
        title="Ready to Start Your Interior Design Project?"
        description="Get a detailed price estimate for your specific needs"
        buttonText="Calculate Your Price"
        className="reveal-on-scroll"
      />
    </PageLayout>
  );
};

export default Services;

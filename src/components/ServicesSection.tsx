
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tab } from '@headlessui/react';

const services = [
  {
    id: 'full-home',
    name: 'Full Home Interior',
    description: 'Complete interior design and execution for your entire home.',
    features: ['Custom floor plans', 'Color palette selection', 'Furniture & decor', 'Lighting design', 'Project management'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subServices: [
      { name: 'Luxury Package', price: 'Starting at $50,000' },
      { name: 'Premium Package', price: 'Starting at $30,000' },
      { name: 'Essential Package', price: 'Starting at $15,000' },
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen Renovation',
    description: 'Transform your kitchen into a functional and beautiful space.',
    features: ['Custom cabinetry', 'Countertop selection', 'Appliance recommendation', 'Lighting design', 'Storage solutions'],
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subServices: [
      { name: 'Luxury Kitchen', price: 'Starting at $35,000' },
      { name: 'Premium Kitchen', price: 'Starting at $20,000' },
      { name: 'Kitchen Refresh', price: 'Starting at $10,000' },
    ]
  },
  {
    id: 'wardrobe',
    name: 'Custom Wardrobes',
    description: 'Personalized storage solutions tailored to your space and needs.',
    features: ['Space planning', 'Material selection', 'Custom compartments', 'Lighting integration', 'Professional installation'],
    image: 'https://images.unsplash.com/photo-1558997519-83c9716d76d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subServices: [
      { name: 'Walk-in Closet', price: 'Starting at $15,000' },
      { name: 'Built-in Wardrobe', price: 'Starting at $8,000' },
      { name: 'Sliding Door System', price: 'Starting at $5,000' },
    ]
  },
  {
    id: 'bathroom',
    name: 'Bathroom Renovation',
    description: 'Create a luxurious and functional bathroom space.',
    features: ['Fixture selection', 'Tile design', 'Vanity customization', 'Lighting design', 'Storage solutions'],
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subServices: [
      { name: 'Luxury Bathroom', price: 'Starting at $25,000' },
      { name: 'Premium Bathroom', price: 'Starting at $15,000' },
      { name: 'Bathroom Refresh', price: 'Starting at $7,500' },
    ]
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <section id="services" className="py-20 bg-brand-gray">
      <div className="container mx-auto">
        <div className="text-center mb-12 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Our Interior <span className="text-brand-yellow">Design Services</span>
          </h2>
          <p className="text-brand-gray-dark text-lg mb-8">
            We offer a comprehensive range of interior design and renovation services to transform your space into a beautiful and functional environment.
          </p>
        </div>

        <Tab.Group onChange={(index) => setSelectedService(services[index])}>
          <Tab.List className="flex flex-wrap justify-center mb-8 gap-2">
            {services.map((service) => (
              <Tab
                key={service.id}
                className={({ selected }) =>
                  cn(
                    'px-5 py-3 rounded-lg font-medium transition-colors focus:outline-none',
                    selected
                      ? 'bg-brand-yellow text-black'
                      : 'bg-white hover:bg-brand-yellow/10 text-brand-gray-dark'
                  )
                }
              >
                {service.name}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels>
            {services.map((service) => (
              <Tab.Panel key={service.id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                    </div>
                    
                    <div className="p-6 md:p-8 flex flex-col">
                      <h3 className="text-2xl font-bold text-brand-dark mb-2">{service.name}</h3>
                      <p className="text-brand-gray-dark mb-5">{service.description}</p>
                      
                      <div className="mb-5">
                        <h4 className="font-semibold text-brand-dark mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-brand-dark">Available Packages:</h4>
                        {service.subServices.map((subService, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between py-2 px-4 rounded-lg border border-gray-100 hover:border-brand-yellow/50 hover:bg-brand-yellow/5 transition-colors"
                          >
                            <span>{subService.name}</span>
                            <span className="font-medium text-brand-dark">{subService.price}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <Button 
                          className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black"
                          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Get a Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default ServicesSection;

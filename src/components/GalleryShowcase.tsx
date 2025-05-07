
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "Modern Kitchen Renovation",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&auto=format&fit=crop&q=60",
    description: "Complete transformation with custom cabinetry and premium finishes."
  },
  {
    id: 2,
    title: "Luxury Bathroom Remodel",
    category: "Bathroom",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=60",
    description: "Spa-like bathroom with premium fixtures and elegant tile work."
  },
  {
    id: 3,
    title: "Contemporary Living Room",
    category: "Living Area",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=60",
    description: "Open concept design with custom built-ins and natural lighting."
  },
  {
    id: 4,
    title: "Custom Home Office",
    category: "Office",
    image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?w=800&auto=format&fit=crop&q=60",
    description: "Productive workspace with custom shelving and ergonomic design."
  }
];

const GalleryShowcase = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-brand-yellow">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our portfolio of stunning renovations and transformations that showcase our attention to detail and quality craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-video relative overflow-hidden group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold px-4 py-2 rounded-md bg-brand-yellow bg-opacity-90">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-brand-yellow hover:bg-brand-yellow/90 text-black px-8 py-6 text-lg font-semibold">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;

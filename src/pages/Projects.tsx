
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CtaSection from "@/components/CtaSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import QuickContactForm from "@/components/QuickContactForm";

const projects = [
  {
    id: 1,
    title: "Modern Minimalist Home",
    type: "Full Home",
    location: "Los Angeles, CA",
    description: "A complete renovation of a 3,200 sq ft modern home with a focus on minimalist design and open spaces.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=800&q=80"
    ],
    category: "full-home"
  },
  {
    id: 2,
    title: "Luxury Kitchen Remodel",
    type: "Kitchen",
    location: "New York, NY",
    description: "Complete kitchen renovation with custom cabinetry, marble countertops, and high-end appliances.",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    category: "kitchen"
  },
  {
    id: 3,
    title: "Contemporary Master Bathroom",
    type: "Bathroom",
    location: "Chicago, IL",
    description: "A spa-like master bathroom with a walk-in shower, freestanding tub, and custom vanity.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80"
    ],
    category: "bathroom"
  },
  {
    id: 4,
    title: "Bespoke Walk-in Closet",
    type: "Wardrobe",
    location: "Miami, FL",
    description: "Custom-designed walk-in closet with specialized storage for clothing, shoes, and accessories.",
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551105378-78e609e1d468?auto=format&fit=crop&w=800&q=80"
    ],
    category: "wardrobe"
  },
  {
    id: 5,
    title: "Mid-Century Modern Living Room",
    type: "Living Room",
    location: "Austin, TX",
    description: "Redesigned living room with mid-century modern furnishings and custom built-in shelving.",
    images: [
      "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=800&q=80"
    ],
    category: "living-room"
  },
  {
    id: 6,
    title: "Executive Home Office",
    type: "Office",
    location: "Seattle, WA",
    description: "Transformed spare room into a productive home office with custom desk and storage solutions.",
    images: [
      "https://images.unsplash.com/photo-1593476550610-87baa860004a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585634917202-6f03b28fc6d0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=800&q=80"
    ],
    category: "office"
  }
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "full-home", name: "Full Home" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bathroom", name: "Bathroom" },
  { id: "wardrobe", name: "Wardrobe" },
  { id: "living-room", name: "Living Room" },
  { id: "office", name: "Office" }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Our Projects</h1>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray-dark">
              Explore our portfolio of completed projects. Each design is unique and tailored to the client's style and needs.
            </p>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-8 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={cn(
                  "rounded-full px-5",
                  activeCategory === category.id 
                    ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" 
                    : "text-brand-dark"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                  selectedProject === project.id ? "md:col-span-2 lg:col-span-3" : ""
                } reveal-on-scroll`}
              >
                <div 
                  className="cursor-pointer overflow-hidden"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" 
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark">{project.title}</h3>
                      <div className="flex items-center gap-4 mt-2 mb-4">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{project.type}</span>
                        <span className="text-sm text-brand-gray-dark">{project.location}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleProjectClick(project.id)}
                      className="text-brand-yellow"
                    >
                      {selectedProject === project.id ? "Close" : "View Details"}
                    </Button>
                  </div>
                  
                  {selectedProject === project.id && (
                    <div className="mt-4 animate-fade-in">
                      <p className="text-brand-gray-dark mb-6">{project.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {project.images.map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`${project.title} - Image ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-lg" 
                          />
                        ))}
                      </div>
                      
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4">Interested in a similar project?</h4>
                        <QuickContactForm />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaSection
        variant="primary"
        title="Want to See What Your Project Will Cost?"
        description="Get a personalized estimate for your interior design project"
        buttonText="Calculate Your Price"
        className="reveal-on-scroll"
      />
    </PageLayout>
  );
};

export default Projects;

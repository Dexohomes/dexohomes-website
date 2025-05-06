
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All Projects" },
  { id: "living", name: "Living Rooms" },
  { id: "kitchen", name: "Kitchens" },
  { id: "bedroom", name: "Bedrooms" },
  { id: "bathroom", name: "Bathrooms" },
  { id: "office", name: "Home Offices" },
];

const projects = [
  {
    id: 1,
    title: "Modern Urban Apartment",
    category: "living",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "New York, NY",
  },
  {
    id: 2,
    title: "Contemporary Kitchen Design",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Boston, MA",
  },
  {
    id: 3,
    title: "Luxury Master Bedroom",
    category: "bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Los Angeles, CA",
  },
  {
    id: 4,
    title: "Spa-Like Bathroom",
    category: "bathroom",
    image: "https://images.unsplash.com/photo-1580229080435-1c4e502b7222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Miami, FL",
  },
  {
    id: 5,
    title: "Minimalist Home Office",
    category: "office",
    image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Chicago, IL",
  },
  {
    id: 6,
    title: "Coastal Living Room",
    category: "living",
    image: "https://images.unsplash.com/photo-1556702571-3e11dd2b1a92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "San Diego, CA",
  },
  {
    id: 7,
    title: "Industrial Kitchen Loft",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Portland, OR",
  },
  {
    id: 8,
    title: "Serene Bedroom Retreat",
    category: "bedroom",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Seattle, WA",
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((project) => project.category === activeCategory);
    
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Our <span className="text-brand-yellow">Portfolio</span>
          </h2>
          <p className="text-brand-gray-dark text-lg max-w-2xl mx-auto">
            Explore our carefully curated collection of interior design projects. Each space tells a unique story and showcases our commitment to exceptional design.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-brand-yellow text-black"
                  : "bg-gray-100 text-brand-gray-dark hover:bg-gray-200"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-semibold text-lg text-brand-dark group-hover:text-brand-yellow transition-colors">
                  {project.title}
                </h3>
                <p className="text-brand-gray-dark text-sm">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-brand-yellow text-brand-dark hover:bg-brand-yellow hover:text-black"
            >
              {showAll ? "Show Less" : "View More Projects"}
            </Button>
          </div>
        )}

        <div className="mt-16 bg-brand-yellow/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
            Ready to transform your space?
          </h3>
          <p className="text-lg text-brand-gray-dark max-w-3xl mx-auto mb-8">
            Let us help you create a home that reflects your style and meets your needs. Our expert team is ready to bring your vision to life.
          </p>
          <Button 
            size="lg" 
            className="bg-brand-yellow hover:bg-brand-yellow/90 text-black px-8 text-lg"
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

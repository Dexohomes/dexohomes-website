
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Upload } from "lucide-react";

const AdminImageLibrary = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageFilter, setImageFilter] = useState("all");
  
  // Mock image data for the content tab - in a real app, you would fetch this from a database
  const mockImages = {
    hero: [
      { id: 1, url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 1", section: "Hero" },
      { id: 2, url: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 2", section: "Hero" },
    ],
    services: [
      { id: 3, url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=200&h=200&q=80", title: "Kitchen Service", section: "Services" },
      { id: 4, url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=200&h=200&q=80", title: "Bathroom Service", section: "Services" },
      { id: 5, url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&h=200&q=80", title: "Living Room", section: "Services" },
    ],
    portfolio: [
      { id: 6, url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 1", section: "Portfolio" },
      { id: 7, url: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 2", section: "Portfolio" },
      { id: 8, url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 3", section: "Portfolio" },
    ],
    testimonials: [
      { id: 9, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80", title: "Client 1", section: "Testimonials" },
      { id: 10, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80", title: "Client 2", section: "Testimonials" },
    ],
    featured: [
      { id: 11, url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=200&h=200&q=80", title: "Featured 1", section: "Featured" },
      { id: 12, url: "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?auto=format&fit=crop&w=200&h=200&q=80", title: "Featured 2", section: "Featured" },
    ],
    recentProjects: [
      { id: 13, url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=200&h=200&q=80", title: "Recent Project 1", section: "Recent Projects" },
      { id: 14, url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&h=200&q=80", title: "Recent Project 2", section: "Recent Projects" },
    ]
  };

  // All images flattened for display
  const allImages = Object.values(mockImages).flat();
  
  // Filtered images based on section filter
  const filteredImages = imageFilter === "all" 
    ? allImages 
    : allImages.filter(img => img.section.toLowerCase() === imageFilter.toLowerCase());

  const handleImageUpload = (section: string) => {
    toast.success(`Image upload requested`, {
      description: `For the ${section} section`
    });
    // In a real app, you would handle the file upload here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Image Library</CardTitle>
        <CardDescription>
          Manage images used across your website
        </CardDescription>
        <div className="flex gap-2 flex-wrap mt-4">
          <Button 
            variant={imageFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("all")}
            className={imageFilter === "all" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            All
          </Button>
          <Button 
            variant={imageFilter === "hero" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("hero")}
            className={imageFilter === "hero" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Hero
          </Button>
          <Button 
            variant={imageFilter === "services" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("services")}
            className={imageFilter === "services" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Services
          </Button>
          <Button 
            variant={imageFilter === "portfolio" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("portfolio")}
            className={imageFilter === "portfolio" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Portfolio
          </Button>
          <Button 
            variant={imageFilter === "testimonials" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("testimonials")}
            className={imageFilter === "testimonials" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Testimonials
          </Button>
          <Button 
            variant={imageFilter === "featured" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("featured")}
            className={imageFilter === "featured" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Featured
          </Button>
          <Button 
            variant={imageFilter === "recent projects" ? "default" : "outline"} 
            size="sm"
            onClick={() => setImageFilter("recent projects")}
            className={imageFilter === "recent projects" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Recent Projects
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className={`border rounded-lg overflow-hidden cursor-pointer ${
                selectedImage === image.id ? "ring-2 ring-brand-yellow" : ""
              }`}
              onClick={() => setSelectedImage(image.id === selectedImage ? null : image.id)}
            >
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-32 object-cover" 
                />
                <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 m-1 rounded">
                  {image.section}
                </div>
              </div>
              <div className="p-2">
                <div className="text-xs font-medium truncate">{image.title}</div>
                <div className="text-xs text-gray-500 mt-1">ID: {image.id}</div>
              </div>
            </div>
          ))}
          
          <div 
            className="border border-dashed rounded-lg flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-gray-50"
            onClick={() => handleImageUpload(imageFilter)}
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500 mt-2">Upload New Image</span>
          </div>
        </div>
        
        {selectedImage && (
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Selected Image Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">Edit Details</Button>
              <Button size="sm" variant="outline">Replace Image</Button>
              <Button size="sm" variant="destructive">Delete</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminImageLibrary;

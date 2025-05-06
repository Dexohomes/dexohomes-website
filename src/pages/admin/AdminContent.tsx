
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { Upload, ImagePlus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock image data
const mockImages = {
  hero: [
    { id: 1, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 1" },
    { id: 2, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 2" },
  ],
  services: [
    { id: 3, url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=200&h=200&q=80", title: "Kitchen Service" },
    { id: 4, url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=200&h=200&q=80", title: "Bathroom Service" },
    { id: 5, url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&h=200&q=80", title: "Living Room" },
  ],
  portfolio: [
    { id: 6, url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 1" },
    { id: 7, url: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 2" },
    { id: 8, url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 3" },
    { id: 9, url: "https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 4" },
  ]
};

// Mock content settings
const mockContent = {
  heading: "Transform Your Space with Interior Excellence",
  subheading: "Dexohomes brings your interior dreams to life with expert design, quality craftsmanship, and personalized service that exceeds expectations.",
  companyName: "Dexohomes",
  phone: "+1 (555) 123-4567",
  email: "info@dexohomes.com",
  address: "123 Design Street, Suite 456, New York, NY 10001"
};

const AdminContent = () => {
  const [content, setContent] = useState(mockContent);
  const [activeTab, setActiveTab] = useState("settings");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { toast } = useToast();

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveContent = () => {
    // In a real app, you would save the content to your backend
    toast({
      title: "Content updated",
      description: "Your content changes have been saved successfully.",
    });
  };

  const handleImageUpload = (section: string) => {
    // In a real app, you would handle file uploads here
    // For now we're just showing a toast
    toast({
      title: "Image upload",
      description: `Upload functionality would be implemented here for ${section} section.`,
    });
  };

  const handleSelectImage = (id: number) => {
    setSelectedImage(id === selectedImage ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-600">Update your website content and images</p>
      </div>

      <Tabs defaultValue="settings" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="settings">General Settings</TabsTrigger>
          <TabsTrigger value="images">Image Library</TabsTrigger>
          <TabsTrigger value="sections">Page Sections</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>General Content Settings</CardTitle>
              <CardDescription>
                Update your website's main content and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={content.companyName}
                    onChange={handleContentChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="heading">Homepage Heading</Label>
                  <Input
                    id="heading"
                    name="heading"
                    value={content.heading}
                    onChange={handleContentChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subheading">Homepage Subheading</Label>
                  <Textarea
                    id="subheading"
                    name="subheading"
                    value={content.subheading}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={content.phone}
                      onChange={handleContentChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={content.email}
                      onChange={handleContentChange}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Office Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={content.address}
                      onChange={handleContentChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveContent}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Image Library Tab */}
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Image Library</CardTitle>
              <CardDescription>
                Manage images used across your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section Images */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Hero Section Images</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleImageUpload("hero")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockImages.hero.map((image) => (
                    <div 
                      key={image.id} 
                      className={`border rounded-lg overflow-hidden cursor-pointer relative ${
                        selectedImage === image.id ? "ring-2 ring-brand-yellow" : ""
                      }`}
                      onClick={() => handleSelectImage(image.id)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-32 object-cover" 
                      />
                      <div className="p-2 text-xs truncate">{image.title}</div>
                    </div>
                  ))}
                  
                  <div 
                    className="border border-dashed rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleImageUpload("hero")}
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  </div>
                </div>
              </div>
              
              {/* Services Section Images */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Services Section Images</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleImageUpload("services")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockImages.services.map((image) => (
                    <div 
                      key={image.id} 
                      className={`border rounded-lg overflow-hidden cursor-pointer relative ${
                        selectedImage === image.id ? "ring-2 ring-brand-yellow" : ""
                      }`}
                      onClick={() => handleSelectImage(image.id)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-32 object-cover" 
                      />
                      <div className="p-2 text-xs truncate">{image.title}</div>
                    </div>
                  ))}
                  
                  <div 
                    className="border border-dashed rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleImageUpload("services")}
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  </div>
                </div>
              </div>
              
              {/* Portfolio Section Images */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Portfolio Section Images</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleImageUpload("portfolio")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockImages.portfolio.map((image) => (
                    <div 
                      key={image.id} 
                      className={`border rounded-lg overflow-hidden cursor-pointer relative ${
                        selectedImage === image.id ? "ring-2 ring-brand-yellow" : ""
                      }`}
                      onClick={() => handleSelectImage(image.id)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-32 object-cover" 
                      />
                      <div className="p-2 text-xs truncate">{image.title}</div>
                    </div>
                  ))}
                  
                  <div 
                    className="border border-dashed rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleImageUpload("portfolio")}
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {selectedImage && (
              <CardFooter className="flex justify-between">
                <div className="text-sm">
                  Image #{selectedImage} selected
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit Details</Button>
                  <Button variant="destructive" size="sm">Remove</Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        {/* Page Sections Tab */}
        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Page Sections</CardTitle>
              <CardDescription>
                Customize content for specific page sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <Button variant="outline" className="justify-between w-full">
                    <span>Hero Section</span>
                    <span>Edit</span>
                  </Button>
                  
                  <Button variant="outline" className="justify-between w-full">
                    <span>Services Section</span>
                    <span>Edit</span>
                  </Button>
                  
                  <Button variant="outline" className="justify-between w-full">
                    <span>Portfolio Section</span>
                    <span>Edit</span>
                  </Button>
                  
                  <Button variant="outline" className="justify-between w-full">
                    <span>Testimonials Section</span>
                    <span>Edit</span>
                  </Button>
                  
                  <Button variant="outline" className="justify-between w-full">
                    <span>Process Section</span>
                    <span>Edit</span>
                  </Button>
                  
                  <Button variant="outline" className="justify-between w-full">
                    <span>Call to Action Sections</span>
                    <span>Edit</span>
                  </Button>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500">
                    Click on a section to edit its content, text, and images
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;

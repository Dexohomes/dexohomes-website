
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Star, Image, ArrowLeft, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/services/leadService";
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Authentication state - simplified for this implementation
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to authenticated for now
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get actual leads data
  const { 
    data: leadsData, 
    isLoading: leadsLoading, 
    error: leadsError,
    refetch: refetchLeads 
  } = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  });

  useEffect(() => {
    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
      toast({
        title: "Error fetching leads",
        description: "Could not load leads data. Please try again.",
        variant: "destructive",
      });
    }
  }, [leadsError, toast]);

  // Mock image data for the content tab - will enhance this with editable section images
  const mockImages = {
    hero: [
      { id: 1, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 1", section: "Hero" },
      { id: 2, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 2", section: "Hero" },
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
    ]
  };

  // All images flattened for display
  const allImages = Object.values(mockImages).flat();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageFilter, setImageFilter] = useState("all");

  // Filtered images based on section filter
  const filteredImages = imageFilter === "all" 
    ? allImages 
    : allImages.filter(img => img.section.toLowerCase() === imageFilter.toLowerCase());

  // Mock reviews data for the reviews tab
  const mockReviews = [
    { id: 1, name: "Anjali Sharma", rating: 5, review: "Exceptional service!", date: "2025-04-12" },
    { id: 2, name: "Rajesh Kumar", rating: 4, review: "Very satisfied with the kitchen renovation.", date: "2025-04-08" },
    { id: 3, name: "Priya Patel", rating: 5, review: "Amazing work on our bedroom design.", date: "2025-03-27" },
    { id: 4, name: "Vikram Singh", rating: 5, review: "The team was professional and delivered on time.", date: "2025-03-15" },
    { id: 5, name: "Neha Gupta", rating: 4, review: "Great attention to detail. Very pleased with the results.", date: "2025-03-10" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin authentication - in a real app, use secure authentication
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const filteredLeads = leadsData?.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    lead.service.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              <span className="text-brand-yellow">Dexo</span>homes Admin
            </CardTitle>
            <CardDescription>Sign in to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
                <Input 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm">
              <p className="font-semibold mb-1">Demo Credentials</p>
              <p className="text-gray-600">Username: admin</p>
              <p className="text-gray-600">Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-500 hover:text-black">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">
              <span className="text-brand-yellow">Dexo</span>homes Admin
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`mb-8 ${isMobile ? 'w-full grid grid-cols-3' : ''}`}>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className={isMobile ? 'hidden sm:inline' : ''}>Leads</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className={isMobile ? 'hidden sm:inline' : ''}>Images</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className={isMobile ? 'hidden sm:inline' : ''}>Reviews</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                  <span>Customer Leads</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetchLeads()}
                    className="flex items-center gap-1"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage and track leads from your website forms
                </CardDescription>
                <div className="relative mt-4 w-full sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="text-center py-12">Loading leads...</div>
                ) : leadsError ? (
                  <div className="text-center py-12 text-red-500">
                    Error loading leads. Please try refreshing.
                  </div>
                ) : filteredLeads.length === 0 ? (
                  <div className="text-center py-12">No leads found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Contact</th>
                          <th className="text-left py-3 px-4">Service</th>
                          <th className="text-left py-3 px-4 hidden md:table-cell">Location</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{lead.name}</td>
                            <td className="py-3 px-4">
                              <div>{lead.email || 'N/A'}</div>
                              <div className="text-gray-500">{lead.phone}</div>
                            </td>
                            <td className="py-3 px-4">{lead.service}</td>
                            <td className="py-3 px-4 hidden md:table-cell">{lead.location}</td>
                            <td className="py-3 px-4">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs ${
                                  lead.status === "New" ? "bg-green-100 text-green-800" :
                                  lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                  lead.status === "Meeting" ? "bg-purple-100 text-purple-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {lead.status || 'New'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Content Tab - Enhanced with section filters */}
          <TabsContent value="content">
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
                  
                  <div className="border border-dashed rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50">
                    <Image className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
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
          </TabsContent>
          
          {/* Reviews Tab - Enhanced with review management */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                  <span>Customer Reviews</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">Add Review</span>
                    <span className="sm:hidden">+</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage and moderate customer testimonials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <div className="flex text-yellow-400 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{review.review}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="text-xs h-7 px-2">Edit</Button>
                        <Button size="sm" variant="outline" className="text-xs h-7 px-2">Approve</Button>
                        <Button size="sm" variant="destructive" className="text-xs h-7 px-2">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Review Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-2 bg-white rounded shadow-sm">
                      <div className="text-xl font-bold">{mockReviews.length}</div>
                      <div className="text-xs text-gray-500">Total Reviews</div>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <div className="text-xl font-bold">
                        {(mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length).toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Average Rating</div>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <div className="text-xl font-bold">
                        {mockReviews.filter(r => r.rating === 5).length}
                      </div>
                      <div className="text-xs text-gray-500">5-Star Reviews</div>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <div className="text-xl font-bold">
                        {mockReviews.filter(r => r.rating <= 3).length}
                      </div>
                      <div className="text-xs text-gray-500">Below 4-Star</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

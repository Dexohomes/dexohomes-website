
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Star, Image } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/services/leadService";
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Authentication state - simplified for this implementation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get actual leads data
  const { data: leadsData, isLoading: leadsLoading, refetch } = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
    enabled: isAuthenticated,
  });

  // Mock image data for the content tab
  const mockImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 1" },
    { id: 2, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&h=200&q=80", title: "Hero Image 2" },
    { id: 3, url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=200&h=200&q=80", title: "Kitchen Service" },
    { id: 4, url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=200&h=200&q=80", title: "Project 1" },
  ];

  // Mock reviews data for the reviews tab
  const mockReviews = [
    { id: 1, name: "Anjali Sharma", rating: 5, review: "Exceptional service!", date: "2025-04-12" },
    { id: 2, name: "Rajesh Kumar", rating: 4, review: "Very satisfied with the kitchen renovation.", date: "2025-04-08" },
    { id: 3, name: "Priya Patel", rating: 5, review: "Amazing work on our bedroom design.", date: "2025-03-27" },
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
          <h1 className="text-2xl font-bold">
            <span className="text-brand-yellow">Dexo</span>homes Admin
          </h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
          </TabsList>
          
          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Customer Leads</CardTitle>
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
                          <th className="text-left py-3 px-4">Location</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{lead.name}</td>
                            <td className="py-3 px-4">
                              <div>{lead.email}</div>
                              <div className="text-gray-500">{lead.phone}</div>
                            </td>
                            <td className="py-3 px-4">{lead.service}</td>
                            <td className="py-3 px-4">{lead.location}</td>
                            <td className="py-3 px-4">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs ${
                                  lead.status === "New" ? "bg-green-100 text-green-800" :
                                  lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                  lead.status === "Meeting" ? "bg-purple-100 text-purple-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {lead.status}
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
          
          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Image Library</CardTitle>
                <CardDescription>
                  Manage images used across your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockImages.map((image) => (
                    <div key={image.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-32 object-cover" 
                      />
                      <div className="p-2 text-xs truncate">{image.title}</div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50">
                    <Image className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Customer Reviews</CardTitle>
                <CardDescription>
                  Manage and moderate customer testimonials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Rating</th>
                        <th className="text-left py-3 px-4">Review</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReviews.map((review) => (
                        <tr key={review.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{review.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">{review.review}</td>
                          <td className="py-3 px-4">{review.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

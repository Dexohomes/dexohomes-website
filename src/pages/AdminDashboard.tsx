
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Star, Image, ArrowLeft, RefreshCcw, Upload } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLeads, updateLeadStatus } from "@/services/leadService";
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

// Let's break down the AdminDashboard into smaller components
import AdminLeadsList from "./admin/AdminLeadsList";
import AdminImageLibrary from "./admin/AdminImageLibrary";
import AdminReviews from "./admin/AdminReviews";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast: uiToast } = useToast();
  const isMobile = useIsMobile();
  
  // Authentication state - simplified for this implementation
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get leads data
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
      toast.error("Error loading leads", {
        description: "Could not load leads data. Please try again."
      });
    }
  }, [leadsError]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin authentication
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
      toast.success("Login successful", {
        description: "Welcome to the admin dashboard"
      });
    } else {
      toast.error("Login failed", {
        description: "Invalid username or password"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

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
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                        <SelectItem value="Quoted">Quoted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="text-center py-12">Loading leads...</div>
                ) : leadsError ? (
                  <div className="text-center py-12 text-red-500">
                    Error loading leads. Please try refreshing.
                  </div>
                ) : !leadsData || leadsData.length === 0 ? (
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
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadsData
                          .filter(lead => {
                            // Search term filter
                            const matchesSearch = 
                              lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              lead.service.toLowerCase().includes(searchTerm.toLowerCase());
                            
                            // Status filter
                            const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
                            
                            return matchesSearch && matchesStatus;
                          })
                          .map((lead) => (
                            <tr key={lead.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium">{lead.name}</td>
                              <td className="py-3 px-4">
                                <div>{lead.email || 'N/A'}</div>
                                <div className="text-gray-500">{lead.phone}</div>
                              </td>
                              <td className="py-3 px-4">{lead.service}</td>
                              <td className="py-3 px-4 hidden md:table-cell">{lead.location}</td>
                              <td className="py-3 px-4">
                                <Select 
                                  defaultValue={lead.status} 
                                  onValueChange={(status) => {
                                    updateLeadStatus(lead.id, status)
                                      .then(() => {
                                        toast.success("Status updated", {
                                          description: `Lead status updated to ${status}`
                                        });
                                        refetchLeads();
                                      })
                                      .catch(() => {
                                        toast.error("Error updating status", {
                                          description: "Please try again"
                                        });
                                      });
                                  }}
                                >
                                  <SelectTrigger className={`w-32 py-1 h-auto text-sm ${
                                    lead.status === "New" ? "bg-green-100 text-green-800" :
                                    lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                    lead.status === "Meeting" ? "bg-purple-100 text-purple-800" :
                                    "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    <SelectValue placeholder={lead.status} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Contacted">Contacted</SelectItem>
                                    <SelectItem value="Meeting">Meeting</SelectItem>
                                    <SelectItem value="Quoted">Quoted</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">View</Button>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Leads Summary</CardTitle>
                <CardDescription>Statistics based on lead status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["New", "Contacted", "Meeting", "Quoted"].map((status) => (
                    <div key={status} className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">
                        {leadsData?.filter(l => l.status === status).length || 0}
                      </div>
                      <div className="text-sm text-gray-500">{status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Images Tab */}
          <TabsContent value="content">
            <AdminImageLibrary />
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

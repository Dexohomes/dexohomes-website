
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCcw, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

// Define the Lead type
interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  location: string;
  created_at: string;
  status: string;
  message?: string;
  source?: string;
}

const LeadsPanel = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching leads directly from Supabase...");

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        setError(`Failed to fetch leads: ${error.message}`);
        toast.error("Failed to load leads", {
          description: error.message
        });
        return;
      }

      console.log("Leads data received:", data);
      setLeads(data || []);
      
      if (data?.length === 0) {
        toast.info("No leads found", {
          description: "Your leads will appear here once they are submitted"
        });
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError(`Unexpected error: ${err.message || "Unknown error"}`);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    lead.phone.includes(searchTerm) ||
    lead.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-xl font-semibold">DexoHomes Admin</span>
          </div>
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Website
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Leads Management</h1>
          <p className="text-gray-600">View and manage all customer leads</p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Leads</CardTitle>
              <CardDescription>View details of all submitted leads</CardDescription>
            </div>
            <Button 
              onClick={fetchLeads}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-10 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-600">Loading leads...</p>
              </div>
            ) : error ? (
              <div className="py-10 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-red-600">Error loading leads</p>
                <p className="text-gray-600 mt-2">{error}</p>
                <Button onClick={fetchLeads} variant="outline" className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-10 text-center border rounded-lg">
                {searchTerm ? (
                  <>
                    <p className="text-lg font-semibold">No matching leads found</p>
                    <p className="text-gray-600 mt-2">Try a different search term</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold">No leads found</p>
                    <p className="text-gray-600 mt-2">Leads will appear here when customers submit the contact form</p>
                  </>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 border-b font-medium">Name</th>
                      <th className="p-3 border-b font-medium">Contact</th>
                      <th className="p-3 border-b font-medium">Service</th>
                      <th className="p-3 border-b font-medium hidden md:table-cell">Location</th>
                      <th className="p-3 border-b font-medium hidden md:table-cell">Date</th>
                      <th className="p-3 border-b font-medium">Status</th>
                      <th className="p-3 border-b font-medium text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{lead.name}</div>
                        </td>
                        <td className="p-3">
                          {lead.email && <div className="text-sm">{lead.email}</div>}
                          <div className="text-sm text-gray-600">{lead.phone}</div>
                        </td>
                        <td className="p-3">{lead.service}</td>
                        <td className="p-3 hidden md:table-cell">{lead.location}</td>
                        <td className="p-3 hidden md:table-cell">{formatDate(lead.created_at)}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            lead.status === "New" ? "bg-green-100 text-green-800" :
                            lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                            lead.status === "Meeting" ? "bg-purple-100 text-purple-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="outline" size="sm" onClick={() => {
                            toast.info(`Lead details for ${lead.name}`, {
                              description: lead.message || "No additional message"
                            });
                          }}>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {leads.length > 0 && (
              <div className="mt-4 text-sm text-gray-500 text-right">
                Total leads: {leads.length}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LeadsPanel;

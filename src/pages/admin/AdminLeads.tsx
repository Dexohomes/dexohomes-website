
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileDown, RefreshCcw } from "lucide-react";
import { getLeads, updateLeadStatus, getLeadById, Lead } from "@/services/leadService";
import { useToast } from "@/hooks/use-toast";
import LeadDetailView from "@/components/admin/LeadDetailView";
import { toast } from "sonner";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      console.log("Fetching leads...");
      const data = await getLeads();
      console.log("Leads data:", data);
      
      if (Array.isArray(data)) {
        setLeads(data);
        console.log(`Successfully loaded ${data.length} leads`);
      } else {
        console.error("Invalid leads data format:", data);
        setLeads([]);
        toast.error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Error loading leads", {
        description: "Please try again later"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateLeadStatus(id, status);
      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, status } : lead
      ));
      toast.success("Status updated", {
        description: "Lead status has been updated successfully"
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status", {
        description: "Please try again later"
      });
    }
  };

  const openLeadDetails = async (id: number) => {
    try {
      const lead = await getLeadById(id);
      if (lead) {
        setSelectedLead(lead);
        setIsDetailViewOpen(true);
      } else {
        toast.error("Could not load lead details");
      }
    } catch (error) {
      console.error("Error fetching lead details:", error);
      toast.error("Error loading lead details");
    }
  };

  const closeLeadDetails = () => {
    setIsDetailViewOpen(false);
    setSelectedLead(null);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      lead.location.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Function to format date string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Function to handle CSV export
  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    // Generate CSV headers
    const headers = ["Name", "Email", "Phone", "Service", "Location", "Status", "Date", "Source", "Message"];
    
    // Generate CSV content
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        `"${lead.name}"`,
        `"${lead.email || ''}"`,
        `"${lead.phone}"`,
        `"${lead.service}"`,
        `"${lead.location}"`,
        `"${lead.status}"`,
        `"${formatDate(lead.created_at)}"`,
        `"${lead.source || 'Website Form'}"`,
        `"${lead.message?.replace(/"/g, '""') || ''}"`, // Escape quotes in messages
      ].join(','))
    ].join('\n');
    
    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Leads exported successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads Management</h1>
        <p className="text-gray-600">Manage and track all leads from your website forms</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Leads</CardTitle>
              <CardDescription>
                View and manage leads from all website forms
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchLeads}
              className="flex items-center gap-1"
            >
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            <Button variant="outline" size="icon" onClick={exportToCSV}>
              <FileDown className="h-4 w-4" />
              <span className="sr-only">Download CSV</span>
            </Button>
          </div>

          <div className="rounded-md border">
            {loading ? (
              <div className="py-10 text-center">Loading leads...</div>
            ) : (
              <Table>
                <TableCaption>A list of all leads from your website forms.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">No leads found. Try refreshing or submitting a new lead.</TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div>{lead.email}</div>
                          <div className="text-gray-500">{lead.phone}</div>
                        </TableCell>
                        <TableCell>{lead.service}</TableCell>
                        <TableCell>{lead.location}</TableCell>
                        <TableCell>{formatDate(lead.created_at)}</TableCell>
                        <TableCell>{lead.source || 'Website Form'}</TableCell>
                        <TableCell>
                          <Select value={lead.status} onValueChange={(status) => handleStatusChange(lead.id, status)}>
                            <SelectTrigger className={`w-28 px-2 py-1 h-auto text-xs ${
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
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => openLeadDetails(lead.id)}>View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leads Summary</CardTitle>
          <CardDescription>Statistics based on lead status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {leads.filter(l => l.status === "New").length}
              </div>
              <div className="text-sm text-gray-500">New Leads</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {leads.filter(l => l.status === "Contacted").length}
              </div>
              <div className="text-sm text-gray-500">Contacted</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {leads.filter(l => l.status === "Meeting").length}
              </div>
              <div className="text-sm text-gray-500">Meetings</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {leads.filter(l => l.status === "Quoted").length}
              </div>
              <div className="text-sm text-gray-500">Quoted</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lead Detail Dialog */}
      <LeadDetailView 
        lead={selectedLead}
        isOpen={isDetailViewOpen}
        onClose={closeLeadDetails}
      />
    </div>
  );
};

export default AdminLeads;

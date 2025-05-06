
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
import { Search, FileDown } from "lucide-react";
import { getLeads, updateLeadStatus, Lead } from "@/services/leadService";
import { useToast } from "@/hooks/use-toast";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      toast({
        title: "Error loading leads",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error loading leads:", error);
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
      toast({
        title: "Status updated",
        description: "Lead status has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error updating status:", error);
    }
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads Management</h1>
        <p className="text-gray-600">Manage and track all leads from your website forms</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            View and manage leads from all website forms
          </CardDescription>
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
            <Button variant="outline" size="icon" onClick={fetchLeads}>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">No leads found</TableCell>
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
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
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
    </div>
  );
};

export default AdminLeads;

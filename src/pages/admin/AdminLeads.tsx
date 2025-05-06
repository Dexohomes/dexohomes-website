
import React, { useState } from 'react';
import { 
  Input, 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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

// Mock data for leads
const mockLeads = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john@example.com", 
    phone: "123-456-7890", 
    service: "Full Home", 
    location: "New York, NY", 
    date: "2023-05-15", 
    status: "New"
  },
  { 
    id: 2, 
    name: "Maria Garcia", 
    email: "maria@example.com", 
    phone: "234-567-8901", 
    service: "Kitchen", 
    location: "Los Angeles, CA", 
    date: "2023-05-14", 
    status: "Contacted" 
  },
  { 
    id: 3, 
    name: "Robert Chen", 
    email: "robert@example.com", 
    phone: "345-678-9012", 
    service: "Bathroom", 
    location: "Chicago, IL", 
    date: "2023-05-13", 
    status: "Meeting" 
  },
  { 
    id: 4, 
    name: "Sarah Johnson", 
    email: "sarah@example.com", 
    phone: "456-789-0123", 
    service: "Office", 
    location: "Miami, FL", 
    date: "2023-05-13", 
    status: "New" 
  },
  { 
    id: 5, 
    name: "David Kim", 
    email: "david@example.com", 
    phone: "567-890-1234", 
    service: "Wardrobe", 
    location: "Dallas, TX", 
    date: "2023-05-12", 
    status: "Quoted" 
  },
  { 
    id: 6, 
    name: "Emily Wilson", 
    email: "emily@example.com", 
    phone: "678-901-2345", 
    service: "Living Room", 
    location: "Seattle, WA", 
    date: "2023-05-11", 
    status: "Contacted" 
  },
  { 
    id: 7, 
    name: "Michael Brown", 
    email: "michael@example.com", 
    phone: "789-012-3456", 
    service: "Full Home", 
    location: "Boston, MA", 
    date: "2023-05-10", 
    status: "Meeting" 
  },
  { 
    id: 8, 
    name: "Jennifer Lee", 
    email: "jennifer@example.com", 
    phone: "890-123-4567", 
    service: "Kitchen", 
    location: "Washington, DC", 
    date: "2023-05-09", 
    status: "Quoted" 
  },
  { 
    id: 9, 
    name: "James Rodriguez", 
    email: "james@example.com", 
    phone: "901-234-5678", 
    service: "Office", 
    location: "Austin, TX", 
    date: "2023-05-08", 
    status: "New" 
  },
  { 
    id: 10, 
    name: "Lisa Wang", 
    email: "lisa@example.com", 
    phone: "012-345-6789", 
    service: "Bathroom", 
    location: "Portland, OR", 
    date: "2023-05-07", 
    status: "Contacted" 
  },
];

const AdminLeads = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      lead.location.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            <Button variant="outline" size="icon">
              <FileDown className="h-4 w-4" />
              <span className="sr-only">Download CSV</span>
            </Button>
          </div>

          <div className="rounded-md border">
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
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div>{lead.email}</div>
                      <div className="text-gray-500">{lead.phone}</div>
                    </TableCell>
                    <TableCell>{lead.service}</TableCell>
                    <TableCell>{lead.location}</TableCell>
                    <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                {mockLeads.filter(l => l.status === "New").length}
              </div>
              <div className="text-sm text-gray-500">New Leads</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {mockLeads.filter(l => l.status === "Contacted").length}
              </div>
              <div className="text-sm text-gray-500">Contacted</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {mockLeads.filter(l => l.status === "Meeting").length}
              </div>
              <div className="text-sm text-gray-500">Meetings</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">
                {mockLeads.filter(l => l.status === "Quoted").length}
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

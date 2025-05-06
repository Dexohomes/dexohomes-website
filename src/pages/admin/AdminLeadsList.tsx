
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { Lead, updateLeadStatus } from '@/services/leadService';

type AdminLeadsListProps = {
  leads: Lead[];
  searchTerm: string;
  filterStatus: string;
  refetchLeads: () => void;
};

const AdminLeadsList = ({ leads, searchTerm, filterStatus, refetchLeads }: AdminLeadsListProps) => {
  const filteredLeads = leads.filter(lead => {
    // Search term filter
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateLeadStatus(id, status);
      toast.success("Status updated", {
        description: `Lead status updated to ${status}`
      });
      refetchLeads();
    } catch (error) {
      toast.error("Error updating status", {
        description: "Please try again"
      });
    }
  };

  // Format date string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (filteredLeads.length === 0) {
    return <div className="text-center py-12">No leads found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Contact</th>
            <th className="text-left py-3 px-4">Service</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Location</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Actions</th>
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
              <td className="py-3 px-4 hidden md:table-cell">{formatDate(lead.created_at)}</td>
              <td className="py-3 px-4">
                <Select 
                  defaultValue={lead.status} 
                  onValueChange={(status) => handleUpdateStatus(lead.id, status)}
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
  );
};

export default AdminLeadsList;

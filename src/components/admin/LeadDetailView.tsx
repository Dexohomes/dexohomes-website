
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lead } from "@/services/leadService";
import { formatDistanceToNow } from "date-fns";

interface LeadDetailViewProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailView = ({ lead, isOpen, onClose }: LeadDetailViewProps) => {
  if (!lead) return null;

  // Format date
  const formattedDate = new Date(lead.created_at).toLocaleString();
  const timeAgo = formatDistanceToNow(new Date(lead.created_at), { addSuffix: true });
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>
            Submitted {timeAgo} from {lead.source || 'Website Form'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Name:</div>
            <div className="col-span-2 font-semibold">{lead.name}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Email:</div>
            <div className="col-span-2">{lead.email || 'Not provided'}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Phone:</div>
            <div className="col-span-2">{lead.phone}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Location:</div>
            <div className="col-span-2">{lead.location}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Service:</div>
            <div className="col-span-2">{lead.service}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Status:</div>
            <div className="col-span-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                lead.status === "New" ? "bg-green-100 text-green-800" :
                lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                lead.status === "Meeting" ? "bg-purple-100 text-purple-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {lead.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="font-medium text-gray-500">Date:</div>
            <div className="col-span-2">{formattedDate}</div>
          </div>

          {lead.message && (
            <div className="grid grid-cols-3 gap-2 items-start">
              <div className="font-medium text-gray-500">Message:</div>
              <div className="col-span-2 whitespace-pre-wrap">{lead.message}</div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 items-start">
            <div className="font-medium text-gray-500">Source:</div>
            <div className="col-span-2">{lead.source || 'Website Form'}</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailView;

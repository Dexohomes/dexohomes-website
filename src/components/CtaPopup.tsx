
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveLead } from "@/services/leadService";
import { toast } from "sonner";
import { X } from "lucide-react";

interface CtaPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  source?: string;
}

const CtaPopup = ({ 
  open, 
  onOpenChange,
  title = "Request a Free Consultation",
  description = "Fill in your details and our team will contact you shortly.",
  source = "CTA Popup"
}: CtaPopupProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveLead({
        name,
        phone,
        location: "Not specified",
        email: null,
        service: "Quick Inquiry",
        message,
        source: source
      });
      
      toast.success("Thank you for your inquiry!", {
        description: "Our team will contact you shortly."
      });
      
      // Reset form and close popup
      setName("");
      setPhone("");
      setMessage("");
      onOpenChange(false);
      
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Error submitting your inquiry", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              rows={3}
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
        
        <p className="text-xs text-center text-gray-500 mt-2">
          We respect your privacy. Your information is safe with us.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CtaPopup;

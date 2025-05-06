
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/services/leadService";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

type QuickContactFormProps = {
  className?: string;
  variant?: "primary" | "secondary";
};

const QuickContactForm = ({ className, variant = "primary" }: QuickContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveLead({
        name,
        phone,
        location,
        email,
        service: "Quick Inquiry", // Changed from "General Inquiry" to differentiate form sources
      });
      
      toast({
        title: "Form submitted successfully!",
        description: "Our team will contact you shortly.",
      });
      
      // Reset form
      setName("");
      setPhone("");
      setLocation("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-3">
        <div>
          {!isMobile && <Label htmlFor="name">Full Name</Label>}
          <Input
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          {!isMobile && <Label htmlFor="email">Email</Label>}
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
          />
        </div>
        <div>
          {!isMobile && <Label htmlFor="phone">Phone Number</Label>}
          <Input
            id="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          {!isMobile && <Label htmlFor="location">Location</Label>}
          <Input
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full ${
              variant === "primary" 
                ? "bg-brand-yellow hover:bg-brand-yellow/90 text-black" 
                : "bg-black hover:bg-black/90 text-white"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Get Free Consultation"}
          </Button>
          <p className="text-xs text-center mt-2 text-gray-500">
            We respect your privacy. Your information is secure.
          </p>
        </div>
      </div>
    </form>
  );
};

export default QuickContactForm;

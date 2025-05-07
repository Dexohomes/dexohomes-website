
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { saveLead } from "@/services/leadService";
import { toast } from "sonner";

type QuickContactFormProps = {
  className?: string;
  variant?: "primary" | "secondary";
  source?: string; // Track which form is submitting
};

const QuickContactForm = ({ className, variant = "primary", source = "Quick Contact Form" }: QuickContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location) {
      toast.error("Please fill all required fields", {
        description: "Name, phone and location are required",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await saveLead({
        name,
        phone,
        location,
        email,
        service: "Quick Inquiry",
        message,
        source // Track where the form was submitted from
      });
      
      console.log("Form submission result:", result);
      
      // Show toast notification
      toast.success("Form submitted successfully!", {
        description: "Our team will contact you shortly.",
      });
      
      // Reset form
      setName("");
      setPhone("");
      setLocation("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form", {
        description: "Please try again later.",
      });
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
          {!isMobile && <Label htmlFor="message">Message (Optional)</Label>}
          <Input
            id="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/services/leadService";

type QuickContactFormProps = {
  className?: string;
  variant?: "primary" | "secondary";
};

const QuickContactForm = ({ className, variant = "primary" }: QuickContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveLead({
        name,
        phone,
        location,
        email: "",
        service: "General Inquiry",
      });
      
      toast({
        title: "Form submitted successfully!",
        description: "Our team will contact you shortly.",
      });
      
      setName("");
      setPhone("");
      setLocation("");
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
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          <Input
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
        </div>
      </div>
    </form>
  );
};

export default QuickContactForm;

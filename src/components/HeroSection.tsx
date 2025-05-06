
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const HeroSection = () => {
  const [date, setDate] = useState<Date>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-yellow opacity-10"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-brand-yellow opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-6 items-center">
          <div className="space-y-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight">
                Transform Your Space with{" "}
                <span className="text-brand-yellow">Interior Excellence</span>
              </h1>
              <p className="mt-6 text-lg text-brand-gray-dark max-w-lg">
                Dexohomes brings your interior dreams to life with expert design, 
                quality craftsmanship, and personalized service that exceeds expectations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black text-lg px-8 py-6"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Free Estimate
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-yellow text-brand-dark hover:text-brand-yellow text-lg px-8 py-6"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Portfolio
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold">500+ Happy Clients</div>
                <div className="text-sm text-brand-gray-dark">Join our satisfied customers</div>
              </div>
            </div>
          </div>

          <div 
            id="calculator" 
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-scale-in" 
            style={{animationDelay: "0.4s"}}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-brand-dark">Price Calculator</h2>
              <p className="text-brand-gray-dark">Get an estimate for your dream interior</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-home">Full Home Interior</SelectItem>
                    <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
                    <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
                    <SelectItem value="wardrobe">Custom Wardrobes</SelectItem>
                    <SelectItem value="living-room">Living Room Design</SelectItem>
                    <SelectItem value="office">Home Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="budget">Estimated Budget ($)</Label>
                <Select required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100000+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="start-date">When do you plan to start?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="details">Project Details</Label>
                <Textarea 
                  id="details" 
                  placeholder="Tell us more about your project needs..." 
                  className="mt-1 min-h-[80px]"
                ></Textarea>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold py-6"
                disabled={formSubmitted}
              >
                {formSubmitted ? "Submitting..." : "Get Free Estimate"}
              </Button>

              <p className="text-xs text-center text-brand-gray-dark">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

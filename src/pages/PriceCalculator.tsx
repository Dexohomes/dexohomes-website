
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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
import { useToast } from "@/hooks/use-toast";

const PriceCalculator = () => {
  const [date, setDate] = useState<Date>();
  const [service, setService] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // In a real app, you would send this data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Estimate request submitted!",
      description: "We'll contact you soon with a detailed estimate.",
    });
    
    setFormSubmitted(false);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Price Calculator</h1>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray-dark">
              Get an estimate for your interior design project by filling out the form below.
              Our team will review your requirements and provide a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 reveal-on-scroll">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-dark">Project Estimate Calculator</h2>
                <p className="text-brand-gray-dark">Fill out the form to get a personalized estimate</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" required className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" required className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="service">Service Type</Label>
                  <Select value={service} onValueChange={setService} required>
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
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">Estimated Budget ($)</Label>
                    <Select value={budget} onValueChange={setBudget} required>
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
                          className="p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="size">Approximate Size (sq ft)</Label>
                  <Input id="size" placeholder="e.g. 1,500" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea 
                    id="details" 
                    placeholder="Tell us more about your project needs..." 
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label className="text-sm text-brand-gray-dark">How did you hear about us?</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {["Google", "Social Media", "Friend", "Magazine", "Other"].map((source) => (
                      <div key={source} className="flex items-center">
                        <input type="radio" id={source} name="source" className="mr-2" />
                        <label htmlFor={source} className="text-sm">{source}</label>
                      </div>
                    ))}
                  </div>
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

            {/* Additional Information */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center reveal-on-scroll">
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-black">1</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Submit Request</h3>
                <p className="text-brand-gray-dark">Fill out the form with your project details and requirements.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center reveal-on-scroll">
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-black">2</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Get Estimate</h3>
                <p className="text-brand-gray-dark">Receive a detailed estimate based on your specific project needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center reveal-on-scroll">
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-black">3</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Begin Project</h3>
                <p className="text-brand-gray-dark">Schedule a consultation to start your interior transformation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Jennifer S.",
                location: "Los Angeles, CA",
                quote: "The estimate I received was detailed and accurate. Dexohomes delivered exactly what they promised, on time and on budget. Couldn't be happier with my new kitchen!",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80"
              },
              {
                name: "Michael T.",
                location: "New York, NY",
                quote: "I was hesitant about the cost of a full home renovation, but the price calculator gave me a clear idea of what to expect. The team was professional and the results exceeded my expectations.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md reveal-on-scroll">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover" 
                  />
                  <div>
                    <h3 className="font-bold text-brand-dark">{testimonial.name}</h3>
                    <p className="text-sm text-brand-gray-dark">{testimonial.location}</p>
                  </div>
                </div>
                <p className="italic text-brand-gray-dark">"{testimonial.quote}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC800" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PriceCalculator;

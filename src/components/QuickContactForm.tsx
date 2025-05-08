import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from '@/integrations/supabase/client';

const QuickContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Kitchen Renovation');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log("Submitting form with data:", { name, email, phone, service, location, message });
      
      // Direct Supabase insertion
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            name, 
            email, 
            phone, 
            service, 
            location, 
            message,
            status: 'New',
            source: 'Website Form' 
          }
        ]);

      if (error) {
        console.error("Error submitting form:", error);
        setError(`Submission failed: ${error.message}`);
        toast.error("Form submission failed", {
          description: error.message
        });
        return;
      }

      console.log("Form submitted successfully");
      setName('');
      setEmail('');
      setPhone('');
      setService('Kitchen Renovation');
      setLocation('');
      setMessage('');
      setSuccess(true);
      
      toast.success("Form submitted successfully", {
        description: "We'll contact you shortly!"
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error("Unexpected error during form submission:", err);
      setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
      toast.error("Form submission failed", {
        description: "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Get a Free Consultation
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Your message has been sent.</span>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Service
                  </label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kitchen Renovation">Kitchen Renovation</SelectItem>
                      <SelectItem value="Bathroom Renovation">Bathroom Renovation</SelectItem>
                      <SelectItem value="Interior Design">Interior Design</SelectItem>
                      <SelectItem value="Home Addition">Home Addition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="mt-6">
                <Button type="submit" disabled={isSubmitting} className={cn(
                  "w-full",
                  isSubmitting && "opacity-60 cursor-not-allowed"
                )}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickContactForm;

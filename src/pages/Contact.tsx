
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, you would send the form data to your backend/API
    // Simulate submission with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Contact Us</h1>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray-dark">
              Have questions or ready to start your interior design project? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-6">Get In Touch</h2>
                <p className="text-lg text-brand-gray-dark mb-8">
                  Whether you have a question about our services, pricing, or 
                  anything else, our team is ready to answer all your questions.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-yellow p-3 rounded-full">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Phone</h3>
                    <p className="text-brand-gray-dark">+91 9845092367</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-yellow p-3 rounded-full">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Email</h3>
                    <p className="text-brand-gray-dark">dexohomes.com@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-yellow p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Visit Us</h3>
                    <p className="text-brand-gray-dark">
                      Hbr layout<br />
                      
                      Bangalore
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-yellow p-3 rounded-full">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Business Hours</h3>
                    <p className="text-brand-gray-dark">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635181550028!5m2!1sen!2sus"
                  width="100%" 
                  height="300" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Dexohomes location"
                  className="shadow-md reveal-on-scroll"
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl reveal-on-scroll">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-gray-dark mb-1">Name</label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-dark mb-1">Phone</label>
                    <Input id="phone" name="phone" required placeholder="Phone number" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-gray-dark mb-1">Email</label>
                  <Input id="email" name="email" type="email" required placeholder="Your email address" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-gray-dark mb-1">Subject</label>
                  <Input id="subject" name="subject" required placeholder="Message subject" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-gray-dark mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="How can we help you?" 
                    className="resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold py-6"
                >
                  Send Message
                </Button>
                
                <p className="text-xs text-center text-brand-gray-dark mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;

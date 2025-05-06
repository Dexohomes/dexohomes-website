
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "Dexohomes transformed our outdated living room into a stunning, modern space that perfectly reflects our style. Their attention to detail and creativity exceeded our expectations.",
    project: "Full Home Renovation",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Developer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "Working with Dexohomes on our multi-unit development was a fantastic experience. Their team managed everything seamlessly, delivering high-end interiors that helped us sell units quickly.",
    project: "Kitchen Redesign",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Homeowner",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "Our kitchen renovation was completed on time and within budget. The Dexohomes team was professional, skilled, and a pleasure to work with throughout the entire process.",
    project: "Kitchen Renovation",
    rating: 4,
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Business Owner",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "The custom wardrobes that Dexohomes designed for our master bedroom are absolutely beautiful and functional. Their team understood exactly what we needed and delivered perfectly.",
    project: "Custom Wardrobes",
    rating: 5,
  },
  {
    id: 5,
    name: "Sophia Patel",
    role: "Homeowner",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    quote: "From concept to completion, Dexohomes provided exceptional service. They transformed our bathroom into a luxurious retreat that feels like a high-end hotel spa.",
    project: "Bathroom Renovation",
    rating: 5,
  },
  {
    id: 6,
    name: "David Thompson",
    role: "Real Estate Investor",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    quote: "I've worked with many interior design firms, but Dexohomes stands out for their creativity, professionalism, and ability to deliver outstanding results consistently.",
    project: "Full Home Interior",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-brand-gray">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Client <span className="text-brand-yellow">Testimonials</span>
          </h2>
          <p className="text-brand-gray-dark text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear what our clients have to say about their experiences working with Dexohomes.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Featured testimonial */}
          <div className="mb-12">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonials[activeTestimonial].avatar}
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className={cn(
                            "text-2xl",
                            i < testimonials[activeTestimonial].rating ? "text-brand-yellow" : "text-gray-300"
                          )}>
                            ★
                          </span>
                        ))}
                    </div>
                    <blockquote className="text-xl italic text-brand-dark mb-4">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-brand-dark">
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="text-brand-gray-dark text-sm">
                        {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].project}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-brand-yellow text-brand-dark hover:bg-brand-yellow hover:text-black"
              onClick={prevTestimonial}
            >
              ←
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeTestimonial === index
                      ? "w-8 bg-brand-yellow"
                      : "bg-gray-300 hover:bg-brand-yellow/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-brand-yellow text-brand-dark hover:bg-brand-yellow hover:text-black"
              onClick={nextTestimonial}
            >
              →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

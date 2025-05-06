
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
    name: "Saayima Sulaiman",
    role: "Google Review",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUSx6rpXISKDD5zhqjuq0rZkFem1ohbr4B2KlV4TzS78GnTeksh=w90-h90-p-rp-mo-ba1-br100",
    quote: "It was a good experience interacting with dexohomes. The team was quite understanding about the client's needs and requirements.Over all they had good designs and they're finishing was appreciable.Thank you dexohomes.",
    project: "Full Home Renovation",
    rating: 5,
  },
  {
    id: 2,
    name: "Pavan",
    role: "Google Review",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUflEi2fvhNnRbhNvmaTmVlwNImbqyxSaKaXgkn1WsXiHyrzzk=w90-h90-p-rp-mo-ba1-br100",
    quote: "Good finishing good work.....you guys should look forward for working with dexo home's.",
    project: "Kitchen Redesign",
    rating: 5,
  },
  {
    id: 3,
    name: "Syed Zain Ahmed",
    role: "Google Review",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXZBd86qSkfrDQWhKIH67xHSNW9eNlP_jKR0QfWva9hwYkaZWHw=w90-h90-p-rp-mo-ba1-br100",
    quote: "Very good finishing, thank you Dexo homes.",
    project: "Kitchen Renovation",
    rating: 4,
  },
  {
    id: 4,
    name: "Syed Safwan",
    role: "Google Review",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXFr2MZQUxjY6Pss9WSS3JGfMBNXecthSC5QSwQ3M1hO7m-Yvfd=w90-h90-p-rp-mo-br100",
    quote: "Excellent work Mr Wahid I loved it.",
    project: "Custom Wardrobes",
    rating: 5,
  },
  {
    id: 5,
    name: "Vamshi Kumar",
    role: "Google Review",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVXeIOPD2M8ygElHR-kcpkXuyj8Uzzo-7T0RoUmEUEDNwV-vXcR=w90-h90-p-rp-mo-br100",
    quote: "Very good service, Starting from designing to execution.",
    project: "Bathroom Renovation",
    rating: 5,
  },
  {
    id: 6,
    name: "Syed Imtiyaz",
    role: "Google Review",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLdJjyhRlT5Kk8P1Oc2Sb13qh7BQnt9X7_sk9Pl8OxD-v18uA=w90-h90-p-rp-mo-br100",
    quote: "i have made a kitchen from dexo homes is best price and workers im happy with service.",
    project: "Kitchen Interior",
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


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import PopupContactForm from "./PopupContactForm";

type CtaSectionProps = {
  variant?: "primary" | "secondary";
  title: string;
  description: string;
  buttonText: string;
  className?: string;
  buttonLink?: string;
  usePopup?: boolean;
  scrollToQuoteForm?: boolean;
};

const CtaSection = ({
  variant = "primary",
  title,
  description,
  buttonText,
  className,
  buttonLink = "/price-calculator",
  usePopup = false,
  scrollToQuoteForm = false,
}: CtaSectionProps) => {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleButtonClick = () => {
    if (usePopup) {
      setShowPopup(true);
    } else if (scrollToQuoteForm) {
      // Scroll to the quote form section at the bottom of the page
      const quoteFormElement = document.getElementById('quote-form-section');
      if (quoteFormElement) {
        quoteFormElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className={cn(
        "py-16",
        variant === "primary"
          ? "bg-brand-yellow text-black"
          : "bg-brand-dark text-white",
        className
      )}
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className={cn("text-lg mb-8", variant === "secondary" && "text-gray-300")}>
            {description}
          </p>
          {usePopup || scrollToQuoteForm ? (
            <Button
              size="lg"
              className={cn(
                "px-8 py-6 text-lg",
                variant === "primary"
                  ? "bg-black hover:bg-black/90 text-white"
                  : "bg-brand-yellow hover:bg-brand-yellow/90 text-black"
              )}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              size="lg"
              className={cn(
                "px-8 py-6 text-lg",
                variant === "primary"
                  ? "bg-black hover:bg-black/90 text-white"
                  : "bg-brand-yellow hover:bg-brand-yellow/90 text-black"
              )}
              asChild
            >
              <Link to={buttonLink}>
                {buttonText}
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      {showPopup && (
        <PopupContactForm 
          onClose={() => setShowPopup(false)} 
          source={`CTA Section - ${title}`}
        />
      )}
    </section>
  );
};

export default CtaSection;
